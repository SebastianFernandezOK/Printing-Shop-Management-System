import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes-edit',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ordenes-edit.component.html',
  styleUrls: ['./ordenes-edit.component.scss']
})
export class OrdenesEditComponent implements OnInit {
  ordenForm!: FormGroup;
  loading = true;
  ordenId!: string;
  clientes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ordenesService: OrdenesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.ordenId = this.route.snapshot.paramMap.get('id')!;
    this.ordenesService.getClientes().subscribe({
      next: (res) => {
        this.clientes = res.data;
      }
    });
    this.ordenesService.getOrdenById(this.ordenId).subscribe({
      next: (orden) => {
        this.ordenForm = this.fb.group({
          cliente_id: [orden.cliente_id],
          numero_lote: [orden.numero_lote],
          soporte: [orden.soporte],
          alto_mm: [orden.alto_mm],
          ancho_mm: [orden.ancho_mm],
          z: [orden.z],
          desarrollo: [orden.desarrollo],
          alto_desarrollo: [orden.alto_desarrollo],
          metros: [orden.metros],
          demasia: [orden.demasia],
          cantidad_rollos: [orden.cantidad_rollos],
          banda: [orden.banda],
          lado: [orden.lado],
          sentido_bobina: [orden.sentido_bobina],
          cantidad_etiquetas: [orden.cantidad_etiquetas],
          observaciones: [orden.observaciones],
          // Puedes agregar más campos si el modelo se amplía
        });
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSubmit() {
    if (this.ordenForm.valid) {
      this.ordenesService.updateOrden(this.ordenId, this.ordenForm.value).subscribe({
        next: () => this.router.navigate(['/ordenes', this.ordenId]),
      });
    }
  }
}
