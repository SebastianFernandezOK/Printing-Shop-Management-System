import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from '../ordenes/ordenes.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preprensa-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatTabsModule],
  templateUrl: './preprensa-detail.html',
  styleUrls: ['./preprensa-detail.scss']
})
export class PreprensaDetailComponent implements OnInit {
  orden: any;
  selectedFile: File | null = null;
  uploading = false;
  uploadError: string | null = null;
  observacionesGuardadas = false;
  observacionesError: string | null = null;
  isFullscreen = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ordenesService: OrdenesService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ordenesService.getOrdenById(id).subscribe({
        next: (res) => {
          this.orden = res;
          // Si hay archivos, setea imagenUrl para mostrar la foto
          if (this.orden.archivos && this.orden.archivos.length > 0 && this.orden.archivos[0].ruta) {
            this.orden.imagenUrl = `http://localhost:9000/${this.orden.archivos[0].ruta}`;
          }
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadError = null;
    }
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

  volverALista() {
    this.router.navigate(['/preprensa']);
  }

  seleccionarArchivo() {
    this.fileInput?.nativeElement?.click();
  }

  async guardarObservaciones() {
    this.observacionesGuardadas = false;
    this.observacionesError = null;
    if (!this.orden || !this.orden.id_orden_trabajo) return;
    // Construir el objeto completo para update
    const updateData: any = {
      cliente_id: this.orden.cliente_id,
      id_tipo_troquelado: this.orden.id_tipo_troquelado,
      id_sistema: this.orden.id_sistema,
      id_usuario: this.orden.id_usuario,
      numero_lote: this.orden.numero_lote,
      fecha_creacion: this.orden.fecha_creacion,
      soporte: this.orden.soporte,
      alto_mm: this.orden.alto_mm,
      ancho_mm: this.orden.ancho_mm,
      z: this.orden.z,
      desarrollo: this.orden.desarrollo,
      alto_desarrollo: this.orden.alto_desarrollo,
      metros: this.orden.metros,
      demasia: this.orden.demasia,
      cantidad_rollos: this.orden.cantidad_rollos,
      banda: this.orden.banda,
      lado: this.orden.lado,
      sentido_bobina: this.orden.sentido_bobina,
      cantidad_etiquetas: this.orden.cantidad_etiquetas,
      observaciones: this.orden.observaciones
    };
    try {
      await this.ordenesService.updateOrden(this.orden.id_orden_trabajo, updateData).subscribe({
        next: () => {
          this.observacionesGuardadas = true;
          setTimeout(() => (this.observacionesGuardadas = false), 2000);
        },
        error: () => {
          this.observacionesError = 'Error al guardar las observaciones';
        }
      });
    } catch (e) {
      this.observacionesError = 'Error inesperado al guardar';
    }
  }

  openFullscreen() {
    this.isFullscreen = true;
  }

  closeFullscreen() {
    this.isFullscreen = false;
  }
}
