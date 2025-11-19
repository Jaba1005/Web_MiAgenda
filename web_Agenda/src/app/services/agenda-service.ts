import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {


  constructor(private http: HttpClient) { }
  apiUri = '/api/saveUser';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  getAllAgendaData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }

}

