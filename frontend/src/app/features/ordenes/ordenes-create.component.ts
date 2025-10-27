import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './ordenes-create.component.html',
  styleUrls: ['./ordenes-create.component.scss']
})
export class OrdenesCreateComponent implements OnInit {
  orden: any = {
    cliente_id: null,
    id_tipo_troquelado: null,
    id_sistema: null,
    id_usuario: 1, // Usuario por defecto
    numero_lote: '',
    fecha_creacion: new Date(),
    soporte: '',
    alto_mm: null,
    ancho_mm: null,
    z: null,
    desarrollo: null,
    alto_desarrollo: null,
    metros: null,
    demasia: null,
    cantidad_rollos: null,
    banda: null,
    lado: '',
    sentido_bobina: null,
    cantidad_etiquetas: null,
    observaciones: ''
  };

  clientes: any[] = [];
  sistemas: any[] = [];
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private ordenesService: OrdenesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClientes();
    this.loadSistemas();
  }

  loadClientes() {
    this.ordenesService.getClientes(0, 1000).subscribe({
      next: (res) => {
        this.clientes = res.data || res;
      },
      error: () => {
        this.error = 'Error al cargar clientes';
      }
    });
  }

  loadSistemas() {
    this.ordenesService.getSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.data || res;
      },
      error: () => {
        this.error = 'Error al cargar sistemas de impresión';
      }
    });
  }

  crearOrden() {
    this.loading = true;
    this.error = null;
    this.success = false;

    // Validación básica
    if (!this.orden.cliente_id) {
      this.error = 'Debe seleccionar un cliente';
      this.loading = false;
      return;
    }

    this.ordenesService.createOrden(this.orden).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/ordenes']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        // Mostrar el mensaje de error del backend
        if (err.error && err.error.detail) {
          this.error = err.error.detail;
        } else if (err.status === 400) {
          this.error = 'Error de validación. Verifique los datos ingresados.';
        } else {
          this.error = 'Error al crear la orden de trabajo';
        }
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/ordenes']);
  }
}
