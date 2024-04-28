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
    private authServer: AuthService,
    private poStorageService: PoStorageService
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean | any> {
    return new Promise((resolve,reject)=> {
      const ret = sessionStorage.getItem('auth-token');
      // if(ret){
      //   this.authServer.getTokenValid(ret).subscribe(
      //     (ret)=> {
      //       if(ret){
      //         (route.routeConfig?.path ===  'login' && this.router.navigateByUrl('/'));
      //         resolve(true)
      //       }
      //     },
      //     (err)=> {
      //       localStorage.removeItem('token');
      //       this.router.navigateByUrl('/login')
      //       resolve(false)
      //     }
      //   );

      // } else {
      //   (route.routeConfig?.path !==  'login' && this.router.navigateByUrl('/login'));
      //   resolve(route.routeConfig?.path ===  'login')
      // }

      if(ret) {
        (route.routeConfig?.path ===  'login' && this.router.navigateByUrl('/'));
        resolve(true)
      } else  {
        (route.routeConfig?.path !==  'login' && this.router.navigateByUrl('/login'));
        resolve(route.routeConfig?.path ===  'login')
      }
    })
  }

}
