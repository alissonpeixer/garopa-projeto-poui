import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {  Observable, catchError, throwError,  } from 'rxjs';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from './../../services/auth.service';
import { TokenStorageService } from './../../services/token-storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly TOKEN_HEADER_KEY: string = 'Authorization';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object> | any> {

    let authRequest = request;

    const refreshToken = this.tokenService.getRefreshToken();
    const token = this.tokenService.getToken();

    if (token && !request.url.includes('/auth/token/refresh/') && !request.url.includes('/auth/login/')) {
      authRequest = this.addTokenHeader(authRequest, token);
    }

    return next.handle(authRequest).pipe(
      catchError((error:HttpErrorResponse): any => {

        if(error.error.code  === "token_not_valid" && error.status === 401 && refreshToken){

          this.authService.postRefreshToken(refreshToken).subscribe(
            (ret)=> {
              this.tokenService.saveRefreshToken(ret.items.refresh_token);
              this.tokenService.saveToken(ret.items.token);
              location.reload();
            },
            (err)=> {
              this.tokenService.clearTokens();
              this.router.navigateByUrl('/login');
            }
          );
        }

        return throwError(error);
      })
    );
  }



  private addTokenHeader(request: HttpRequest<any>, token: string) {

    return request.clone({ headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token) });

  }
}
