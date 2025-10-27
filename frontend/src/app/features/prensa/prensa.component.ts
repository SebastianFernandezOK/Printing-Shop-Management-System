import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrensaDetalleComponent } from './prensa-detalle.component';

@Component({
  selector: 'app-prensa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, PrensaDetalleComponent],
  templateUrl: './prensa.component.html',
  styleUrls: ['./prensa.component.scss']
})
export class PrensaComponent {
  ordenes$: Observable<any[]>;
  selectedOrden: any = null;
  loadingDetalle = false;

  constructor(private http: HttpClient) {
    // Usar el endpoint general para traer todas las órdenes y mapear solo el array
    this.ordenes$ = this.http.get<any>('http://localhost:9000/ordenes_trabajo?offset=0&limit=50')
      .pipe(map(res => res.data));
  }

  selectOrden(orden: any) {
    this.loadingDetalle = true;
    // Usar el endpoint por id para traer el detalle completo
    this.http.get<any>(`http://localhost:9000/ordenes_trabajo/${orden.id_orden_trabajo}`).subscribe({
      next: (detalle) => {
        this.selectedOrden = detalle;
        this.loadingDetalle = false;
        // Si hay archivos, asignar la imagen principal
        if (detalle.archivos && detalle.archivos.length > 0) {
          // Puedes elegir la última, la primera, o la que cumpla algún criterio
          this.selectedOrden.imagenUrl = `http://localhost:9000/${detalle.archivos[0].ruta}`;
        }
      },
      error: () => {
        this.selectedOrden = null;
        this.loadingDetalle = false;
      }
    });
  }

  closeDetalle() {
    this.selectedOrden = null;
  }
}
