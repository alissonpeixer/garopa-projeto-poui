import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Fornecedor, FornecedorDto } from '../interface/fornedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  public readonly apiUrl = `${environment.api}/fornecedor`;

  constructor(
    private httpClient : HttpClient
  ) { }

  public postFornecedor(body: Fornecedor): Observable<FornecedorDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.post<FornecedorDto>(`${this.apiUrl}/`, body, {headers});
  }

  public putFornecedor(body: Fornecedor): Observable<FornecedorDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.put<FornecedorDto>(`${this.apiUrl}/${body.id}/`,body,{headers});
  }

  public getFornecedorById(id: string): Observable<Fornecedor> {
    return this.httpClient.get<Fornecedor>(`${this.apiUrl}/${id}/`);
  }

  public deleteFornecedorById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}/`);
  }
}
