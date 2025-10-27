import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="apartado-wrapper">
      <div class="apartado-card">
        <mat-icon class="apartado-icon" color="primary">construction</mat-icon>
        <h2 class="apartado-title">Sección en construcción</h2>
        <p class="apartado-desc">Pronto verás aquí la gestión premium de este apartado.</p>
      </div>
    </div>
  `
})
export class EmptyComponent {}
