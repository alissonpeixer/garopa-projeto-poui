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

  saveToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);

  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveRefreshToken(token: string): void {
    localStorage.removeItem(this.REFRESHTOKEN_KEY);
    localStorage.setItem(this.REFRESHTOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESHTOKEN_KEY);
  }

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESHTOKEN_KEY);
  }
}
