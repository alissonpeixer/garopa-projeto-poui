import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteCrud } from '../app/compras/compras-cliente/crud/intereface/cliente-crud';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl = 'http://127.0.0.1:8000/api/clientes/';

  constructor(
    private httpClient : HttpClient
  ) { }

  postCliente(body: ClienteCrud): Observable<any> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.post(`${this.apiUrl}`, body, {headers})
  }
}
