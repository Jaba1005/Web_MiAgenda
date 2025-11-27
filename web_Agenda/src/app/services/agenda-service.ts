import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AgendaItem {
  _id?: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  fechaInicio: string;   // formato YYYY-MM-DD
  fechaFin: string;      // formato YYYY-MM-DD
  cooperativo: boolean;
  recordatorio: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getAll(): Observable<AgendaItem[]> {
    return this.http.get<AgendaItem[]>(`${this.API_URL}/consultEvents`);
  }

  // Obtener un evento por ID
  getOne(id: string): Observable<AgendaItem> {
    return this.http.get<AgendaItem>(`${this.API_URL}/consultEvents/${id}`);
  }

  // Crear nuevo evento
  create(data: AgendaItem): Observable<any> {
    return this.http.post(`${this.API_URL}/saveEvent`, data);
  }

  // Actualizar un evento existente
  update(id: string, data: AgendaItem): Observable<any> {
    return this.http.put(`${this.API_URL}/updateEvent/${id}`, data);
  }

  // Eliminar un evento
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteEvent/${id}`);
  }
}
