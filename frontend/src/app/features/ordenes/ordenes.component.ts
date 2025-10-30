import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
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
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  ordenes: any[] = [];
  ordenesFiltered: any[] = [];
  total = 0;
  loading = true;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [2, 5, 10, 20, 50];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  constructor(
    private ordenesService: OrdenesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchOrdenes();
  }

  fetchOrdenes(): void {
    this.loading = true;
    this.ordenesService.getOrdenes(this.pageIndex * this.pageSize, this.pageSize).subscribe({
      next: (res) => {
        this.ordenes = res.data;
        this.ordenesFiltered = [...res.data];
        this.total = res.total;
        this.loading = false;
        // Aplicar búsqueda si hay texto
        if (this.searchText) {
          this.applySearch();
        }
        // Aplicar ordenamiento si hay uno activo
        if (this.sortColumn) {
          this.sortOrdenes();
        }
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

  onSearchChange() {
    this.applySearch();
  }

  applySearch() {
    if (!this.searchText || this.searchText.trim() === '') {
      this.ordenesFiltered = [...this.ordenes];
    } else {
      const searchLower = this.searchText.toLowerCase().trim();
      this.ordenesFiltered = this.ordenes.filter(orden => {
        const numeroLote = (orden.numero_lote || '').toLowerCase();
        return numeroLote.includes(searchLower);
      });
    }
    // Aplicar ordenamiento después de filtrar
    if (this.sortColumn) {
      this.sortOrdenes();
    }
  }

  clearSearch() {
    this.searchText = '';
    this.applySearch();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      // Si es la misma columna, alternar dirección
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Si es una columna nueva, ordenar ascendente
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortOrdenes();
  }

  sortOrdenes() {
    if (!this.sortColumn) return;

    this.ordenesFiltered.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.sortColumn) {
        case 'numero_lote':
          // Extraer la parte numérica del lote para ordenamiento numérico
          const loteA = a.numero_lote || '';
          const loteB = b.numero_lote || '';
          
          // Extraer números del string (ej: "L001" -> 1, "LOTE-123" -> 123)
          const numA = parseInt(loteA.replace(/\D/g, '')) || 0;
          const numB = parseInt(loteB.replace(/\D/g, '')) || 0;
          
          // Si ambos tienen números, comparar numéricamente
          if (numA !== numB) {
            return this.sortDirection === 'asc' ? numA - numB : numB - numA;
          }
          
          // Si los números son iguales, comparar alfabéticamente
          valueA = loteA.toLowerCase();
          valueB = loteB.toLowerCase();
          break;
        case 'cliente':
          valueA = a.cliente?.nombre || '';
          valueB = b.cliente?.nombre || '';
          break;
        case 'sistema':
          valueA = a.sistema?.nombre || '';
          valueB = b.sistema?.nombre || '';
          break;
        case 'estado':
          valueA = a.estado?.nombre || '';
          valueB = b.estado?.nombre || '';
          break;
        default:
          return 0;
      }

      // Para columnas no numéricas, comparar como strings
      if (this.sortColumn !== 'numero_lote') {
        const strA = String(valueA).toLowerCase();
        const strB = String(valueB).toLowerCase();

        if (strA < strB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (strA > strB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
      } else {
        // Para numero_lote con números iguales
        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
      }
      
      return 0;
    });
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

  eliminarOrden(orden: any, event: Event) {
    event.stopPropagation();
    
    if (confirm(`¿Está seguro de eliminar la orden de trabajo N° ${orden.numero_lote}?`)) {
      this.ordenesService.deleteOrden(orden.id_orden_trabajo).subscribe({
        next: () => {
          this.fetchOrdenes();
          alert('Orden eliminada exitosamente');
        },
        error: (err) => {
          // Mostrar el mensaje de error del backend
          if (err.error && err.error.detail) {
            alert(err.error.detail);
          } else {
            alert('Error al eliminar la orden de trabajo');
          }
        }
      });
    }
  }
}
