import { TokenStorageService } from './../../services/token-storage.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PoStorageService } from "@po-ui/ng-storage";


import { AuthService } from "../../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean | any> {
    return new Promise((resolve,reject)=> {
      const token = this.tokenStorageService.getToken();
      const refreshToken = this.tokenStorageService.getRefreshToken();

      if(token && refreshToken) {
        (route.routeConfig?.path ===  'login' && this.router.navigateByUrl('/'));
        resolve(true)
      } else  {
        (route.routeConfig?.path !==  'login' && this.router.navigateByUrl('/login'));
        resolve(route.routeConfig?.path ===  'login')
      }
    })
  }

}
