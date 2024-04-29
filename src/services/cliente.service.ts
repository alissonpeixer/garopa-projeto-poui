import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteCrud, ClienteCrudDto } from '../app/compras/compras-cliente/crud/intereface/cliente-crud';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public readonly apiUrl = `${environment.api}/clientes`;

  constructor(
    private httpClient : HttpClient
  ) { }

  public postCliente(body: ClienteCrud): Observable<ClienteCrudDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.post<ClienteCrudDto>(`${this.apiUrl}/`, body, {headers});
  }

  public putCliente(body: ClienteCrud): Observable<ClienteCrudDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.put<ClienteCrudDto>(`${this.apiUrl}/${body.id}/`,body,{headers});
  }

  public getClienteById(id: number): Observable<ClienteCrud> {
    return this.httpClient.get<ClienteCrud>(`${this.apiUrl}/${id}/`);
  }

  public deleteClienteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}/`);
  }
}
