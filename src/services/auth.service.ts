import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDto, LoginPage } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = 'http://127.0.0.1:8000/auth';

  constructor(
    private httpClient: HttpClient
  ) {}

  postLogin({login,password}:LoginPage): Observable<AuthDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };

    const body = {
      "username": login,
      "password": password
    };

    return this.httpClient.post<AuthDto>(`${this.apiUrl}/login/`,body,{headers})
  }

  getTokenValid(token:string): Observable<AuthDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };
    return this.httpClient.get<AuthDto>(`${this.apiUrl}/token/`,{headers})
  }


  postRefreshToken(token:string): Observable<AuthDto> {
    const headers = { 'X-PO-Screen-Lock': 'true' };

    const body = {
      "refresh_token": token
    };

    return this.httpClient.post<AuthDto>(`${this.apiUrl}/token/refresh/`,body,{headers})
  }
}
