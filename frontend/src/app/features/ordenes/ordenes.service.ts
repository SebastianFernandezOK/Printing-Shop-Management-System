import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdenesService {
  private apiUrl = 'http://localhost:9000/ordenes_trabajo/';

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
    return this.http.get<any>('http://localhost:9000/clientes/?offset=' + offset + '&limit=' + limit);
  }

  getSistemas(): Observable<any> {
    return this.http.get<any>('http://localhost:9000/sistemas/');
  }

  getEstados(): Observable<any> {
    return this.http.get<any>('http://localhost:9000/estados/');
  }
}
