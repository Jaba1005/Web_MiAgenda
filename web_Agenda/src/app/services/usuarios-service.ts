import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioItem {
  _id?: string;
  nombre: string;
  correo: string;
  numero: string;
  contrasena: string;   
}

@Injectable({
  providedIn: 'root',
})

export class UsuariosService {
  private API_URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getAll(): Observable<UsuarioItem[]> {
    return this.http.get<UsuarioItem[]>(`${this.API_URL}/consultUsers`);
  }

  createUser(data: UsuarioItem): Observable<any> {
      return this.http.post(`${this.API_URL}/saveUser`, data);
    }

  updateUser(id: string, data: UsuarioItem): Observable<UsuarioItem> {
    return this.http.put<UsuarioItem>(`${this.API_URL}/updateUser/${id}`, data);
  }
}

