import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdenesService {
  private apiUrl = `${environment.apiUrl}/ordenes_trabajo/`;

  constructor(private http: HttpClient) {}

  getOrdenes(offset = 0, limit = 20): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getOrdenById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  updateOrden(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}${id}`, data);
  }

  createOrden(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getClientes(offset = 0, limit = 100): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/clientes/?offset=${offset}&limit=${limit}`);
  }

  getSistemas(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/sistemas/`);
  }

  getEstados(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/estados/`);
  }

  deleteOrden(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
}
