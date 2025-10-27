import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-prensa-detalle',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './prensa-detalle.component.html',
  styleUrls: ['./prensa-detalle.component.scss']
})
export class PrensaDetalleComponent implements OnInit {
  @Input() orden: any;
  @Output() close = new EventEmitter<void>();

  selectedTab: number = 0;
  selectedFile: File | null = null;
  uploading = false;
  uploadError: string | null = null;
  usuarios: any[] = [];
  controlPrensaEdit: any = {
    metros_registro: null,
    metros_impresos: null,
    id_usuario: null,
    observaciones: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cargar usuarios para el select
    this.http.get<any>('http://localhost:9000/users/').subscribe({
      next: (res) => {
        this.usuarios = Array.isArray(res) ? res : res.data;
      }
    });
    // Inicializar objeto editable con los datos actuales
    if (this.orden?.id_orden_trabajo) {
      // Buscar el registro de controlPrensa relacionado a la orden actual
      this.http.get<any>(`http://localhost:9000/controles_prensa/?id_orden_trabajo=${this.orden.id_orden_trabajo}`).subscribe({
        next: (res) => {
          console.log('ControlPrensa recibido:', res); // DEBUG
          if (res && res.length > 0) {
            this.orden.controlPrensa = res[0];
            this.controlPrensaEdit = {
              metros_registro: res[0].metros_registro,
              metros_impresos: res[0].metros_impresos,
              id_usuario: res[0].id_usuario,
              observaciones: res[0].observaciones || ''
            };
          } else {
            this.orden.controlPrensa = null;
            this.controlPrensaEdit = {
              metros_registro: null,
              metros_impresos: null,
              id_usuario: null,
              observaciones: ''
            };
          }
        }
      });
    }
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  onClose() {
    this.close.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadError = null;
    }
  }

  uploadImage() {
    if (!this.selectedFile || !this.orden?.id_orden_trabajo) return;
    this.uploading = true;
    this.uploadError = null;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('orden_id', this.orden.id_orden_trabajo);
    this.http.post<any>('http://localhost:9000/archivos/upload', formData).subscribe({
      next: (res: any) => {
        this.uploading = false;
        this.selectedFile = null;
        // Si la ruta es absoluta, úsala directamente. Si es relativa, prepéndela con la URL base
        if (res && res.ruta) {
          if (res.ruta.startsWith('http')) {
            this.orden.imagenUrl = res.ruta;
          } else {
            this.orden.imagenUrl = `http://localhost:9000/${res.ruta.replace(/^\/+/, '')}`;
          }
        }
      },
      error: (err) => {
        this.uploading = false;
        this.uploadError = 'Error al subir la imagen';
      }
    });
  }

  async uploadOrReplaceImage() {
    if (!this.selectedFile || !this.orden) return;
    this.uploading = true;
    this.uploadError = null;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    if (this.orden.archivos && this.orden.archivos.length > 0) {
      // Reemplazar imagen existente
      const idArchivo = this.orden.archivos[0].id_archivo;
      await this.http.put<any>(`http://localhost:9000/archivos/replace/${idArchivo}`, formData).subscribe({
        next: (res: any) => {
          this.uploading = false;
          this.selectedFile = null;
          this.orden.imagenUrl = `http://localhost:9000/${res.ruta}`;
          this.orden.archivos[0] = res;
        },
        error: (err) => {
          this.uploading = false;
          this.uploadError = 'Error al reemplazar la imagen';
        }
      });
    } else {
      // Subir nueva imagen
      formData.append('orden_id', this.orden.id_orden_trabajo);
      await this.http.post<any>('http://localhost:9000/archivos/upload', formData).subscribe({
        next: (res: any) => {
          this.uploading = false;
          this.selectedFile = null;
          this.orden.imagenUrl = `http://localhost:9000/${res.ruta}`;
          this.orden.archivos = [res];
        },
        error: (err) => {
          this.uploading = false;
          this.uploadError = 'Error al subir la imagen';
        }
      });
    }
  }

  async deleteImage() {
    if (!this.orden?.archivos || this.orden.archivos.length === 0) return;
    const idArchivo = this.orden.archivos[0].id_archivo;
    await this.http.delete<any>(`http://localhost:9000/archivos/${idArchivo}`).subscribe({
      next: () => {
        this.orden.imagenUrl = null;
        this.orden.archivos = [];
      },
      error: () => {
        this.uploadError = 'Error al eliminar la imagen';
      }
    });
  }

  guardarControlPrensa() {
    if (!this.orden?.id_orden_trabajo) return;
    const payload = {
      metros_registro: this.controlPrensaEdit.metros_registro,
      metros_impresos: this.controlPrensaEdit.metros_impresos,
      id_usuario: this.controlPrensaEdit.id_usuario,
      observaciones: this.controlPrensaEdit.observaciones,
      id_orden_trabajo: this.orden.id_orden_trabajo
    };
    const idControlPrensa = this.orden?.controlPrensa?.id_control_prensa;
    if (idControlPrensa) {
      // Modificar registro existente
      this.http.put<any>(`http://localhost:9000/controles_prensa/${idControlPrensa}`, payload).subscribe({
        next: (res) => {
          this.orden.controlPrensa = res;
        }
      });
    } else if (!idControlPrensa && this.orden?.controlPrensa) {
      // Si el registro existe pero no tiene id_control_prensa, no hacer nada
      // Opcional: mostrar mensaje de error o advertencia
      return;
    } else {
      // Crear nuevo registro solo si no existe ninguno
      this.http.post<any>(`http://localhost:9000/controles_prensa/`, payload).subscribe({
        next: (res) => {
          this.orden.controlPrensa = res;
        }
      });
    }
  }

  editarControlPrensa() {
    if (!this.orden?.controlPrensa?.id_control_prensa) return;
    const payload = {
      metros_registro: this.controlPrensaEdit.metros_registro,
      metros_impresos: this.controlPrensaEdit.metros_impresos,
      id_usuario: this.controlPrensaEdit.id_usuario,
      observaciones: this.controlPrensaEdit.observaciones,
      id_orden_trabajo: this.orden.id_orden_trabajo
    };
    const idControlPrensa = this.orden.controlPrensa.id_control_prensa;
    this.http.put<any>(`http://localhost:9000/controles_prensa/${idControlPrensa}`, payload).subscribe({
      next: (res) => {
        this.orden.controlPrensa = res;
      }
    });
  }
}
