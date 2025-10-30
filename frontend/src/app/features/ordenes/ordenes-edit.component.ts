import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './ordenes-edit.component.html',
  styleUrls: ['./ordenes-edit.component.scss']
})
export class OrdenesEditComponent implements OnInit {
  orden: any = null;
  loading = true;
  ordenId!: string;
  clientes: any[] = [];
  sistemas: any[] = [];
  error: string | null = null;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private ordenesService: OrdenesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ordenId = this.route.snapshot.paramMap.get('id')!;
    this.loadClientes();
    this.loadSistemas();
    this.loadOrden();
  }

  loadClientes() {
    this.ordenesService.getClientes(0, 1000).subscribe({
      next: (res) => {
        this.clientes = res.data || res;
      }
    });
  }

  loadSistemas() {
    this.ordenesService.getSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.data || res;
      }
    });
  }

  loadOrden() {
    this.ordenesService.getOrdenById(this.ordenId).subscribe({
      next: (orden) => {
        this.orden = orden;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al cargar la orden';
      }
    });
  }

  actualizarOrden() {
    this.loading = true;
    this.error = null;
    this.success = false;

    if (!this.orden.cliente_id) {
      this.error = 'Debe seleccionar un cliente';
      this.loading = false;
      return;
    }

    this.ordenesService.updateOrden(this.ordenId, this.orden).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/ordenes']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        if (err.error && err.error.detail) {
          this.error = err.error.detail;
        } else {
          this.error = 'Error al actualizar la orden de trabajo';
        }
      }
    });
  }

  cancelar() {
    this.router.navigate(['/ordenes']);
  }
}
