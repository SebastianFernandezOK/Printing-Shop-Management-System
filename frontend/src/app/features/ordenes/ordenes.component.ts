import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ],
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  ordenes: any[] = [];
  total = 0;
  loading = true;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [2, 5, 10, 20, 50];

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  constructor(private ordenesService: OrdenesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrdenes();
  }

  fetchOrdenes(): void {
    this.loading = true;
    this.ordenesService.getOrdenes(this.pageIndex * this.pageSize, this.pageSize).subscribe({
      next: (res) => {
        this.ordenes = res.data;
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.total) {
      this.pageIndex++;
      this.fetchOrdenes();
    }
  }

  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.fetchOrdenes();
    }
  }

  onPageSizeChange() {
    this.pageIndex = 0;
    this.fetchOrdenes();
  }

  goToDetail(orden: any) {
    this.router.navigate(['/ordenes', orden.id_orden_trabajo]);
  }

  goToEdit(orden: any) {
    this.router.navigate(['/ordenes', orden.id_orden_trabajo, 'edit']);
  }

  goToCreate() {
    this.router.navigate(['/ordenes/create']);
  }
}
