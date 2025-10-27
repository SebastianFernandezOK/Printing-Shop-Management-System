import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenesService } from '../ordenes/ordenes.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preprensa-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCardModule],
  templateUrl: './preprensa-list.component.html',
  styleUrls: ['./preprensa-list.component.scss']
})
export class PreprensaListComponent implements OnInit {
  ordenes: any[] = [];
  loading = true;

  constructor(private ordenesService: OrdenesService, private router: Router) {}

  ngOnInit() {
    this.ordenesService.getOrdenes().subscribe({
      next: (res) => {
        // Si la respuesta es un objeto con propiedad 'data', usar esa propiedad
        if (Array.isArray(res)) {
          this.ordenes = res;
        } else if (res && Array.isArray(res.data)) {
          this.ordenes = res.data;
        } else {
          this.ordenes = [];
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  irADetalle(orden: any) {
    this.router.navigate(['/preprensa', orden.id_orden_trabajo]);
  }
}
