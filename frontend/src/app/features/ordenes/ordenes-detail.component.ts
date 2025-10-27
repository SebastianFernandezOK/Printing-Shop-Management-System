import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './ordenes-detail.component.html',
  styleUrls: ['./ordenes-detail.component.scss']
})
export class OrdenesDetailComponent implements OnInit {
  orden: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private ordenesService: OrdenesService, public router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ordenesService.getOrdenById(id).subscribe({
        next: (res) => {
          this.orden = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}
