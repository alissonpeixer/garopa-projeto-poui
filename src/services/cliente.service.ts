import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClienteDto } from '../interface/cliente';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public readonly apiUrl = `${environment.api}/cliente`;

  constructor(
    private httpClient : HttpClient
  ) { }

  public postCliente(body: Cliente): Observable<ClienteDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.post<ClienteDto>(`${this.apiUrl}/`, body, {headers});
  }

  public putCliente(body: Cliente): Observable<ClienteDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.put<ClienteDto>(`${this.apiUrl}/${body.id}/`,body,{headers});
  }

  public getClienteById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.apiUrl}/${id}/`);
  }

  public deleteClienteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}/`);
  }
}
