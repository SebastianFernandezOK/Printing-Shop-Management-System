import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrensaDetalleComponent } from './prensa-detalle.component';
import { environment } from '../../../environments/environment';

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

  // Fallback seguro para el prefijo de API
  private readonly API = environment.apiUrl || '/api';

  // 👇 Esto lo usa tu template (linea que rompía): mantener este nombre
  public readonly apiUrl = this.API;

  constructor(private http: HttpClient) {
    const params = new HttpParams().set('offset', 0).set('limit', 50);
    this.ordenes$ = this.http
      .get<any>(`${this.API}/ordenes_trabajo`, { params })
      .pipe(map(res => res.data));
  }

  selectOrden(orden: any) {
    this.loadingDetalle = true;

    this.http.get<any>(`${this.API}/ordenes_trabajo/${orden.id_orden_trabajo}`).subscribe({
      next: (detalle) => {
        this.selectedOrden = detalle;
        this.loadingDetalle = false;

        if (detalle?.archivos?.length > 0) {
          this.selectedOrden.imagenUrl = `${this.API}/${detalle.archivos[0].ruta}`;
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
