import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private readonly TOKEN_KEY = 'auth-token';
  private readonly REFRESHTOKEN_KEY = 'auth-refreshtoken';

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);

  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(this.REFRESHTOKEN_KEY);
    localStorage.setItem(this.REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESHTOKEN_KEY);
  }

  public clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESHTOKEN_KEY);
  }
}
