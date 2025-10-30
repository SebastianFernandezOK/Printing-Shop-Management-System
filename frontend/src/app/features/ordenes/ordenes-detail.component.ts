import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './ordenes-detail.component.html',
  styles: [`
    .orden-detail-wrapper {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
      padding: 32px 24px;
      margin: 0 auto;
      max-width: 1100px;
      position: relative;
    }

    .volver-btn {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(25, 118, 210, 0.1) !important;
      color: #1976d2 !important;
      transition: all 0.3s;
      z-index: 10;
    }

    .volver-btn:hover {
      background: rgba(25, 118, 210, 0.2) !important;
      transform: translateX(-4px);
    }

    .detail-card {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(25, 118, 210, 0.10);
      padding: 32px;
      margin-top: 20px;
    }

    h2 {
      font-family: 'Montserrat', Arial, sans-serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: #1976d2;
      margin: 0 0 24px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
      border-radius: 12px;
      margin-bottom: 32px;
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
    }

    .orden-number {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.3rem;
      font-weight: 700;
      color: #1976d2;
    }

    .orden-estado {
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
      color: white;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .detail-field {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 18px;
      transition: all 0.3s;
      border: 2px solid transparent;
    }

    .detail-field:hover {
      background: #e3f2fd;
      border-color: #1976d2;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
    }

    .detail-field.full-width {
      grid-column: 1 / -1;
    }

    .field-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: #1976d2;
      margin-bottom: 10px;
      font-size: 0.95rem;
    }

    .field-value {
      font-size: 1.1rem;
      color: #333;
      font-weight: 500;
      padding-left: 28px;
      word-break: break-word;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 20px;
      padding-top: 24px;
      border-top: 2px solid #e0e0e0;
    }

    .actions button {
      min-width: 180px;
      font-weight: 600;
      border-radius: 8px;
      padding: 10px 24px;
      box-shadow: 0 2px 12px rgba(25, 118, 210, 0.15);
      transition: all 0.3s;
    }

    .edit-btn {
      background: linear-gradient(90deg, #ff9800 0%, #ffa726 100%) !important;
      color: white !important;
    }

    .back-btn {
      background: linear-gradient(90deg, #757575 0%, #9e9e9e 100%) !important;
      color: white !important;
    }

    .loading {
      text-align: center;
      padding: 60px 20px;
      color: #1976d2;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .empty {
      text-align: center;
      padding: 60px 20px;
      color: #888;
    }

    @media (max-width: 992px) {
      .detail-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }
      
      .actions {
        flex-direction: column;
      }
      
      .actions button {
        width: 100%;
      }
    }
  `]
})
export class OrdenesDetailComponent implements OnInit {
  orden: any = null;
  loading = true;
  // Forzar recarga

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
