import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { PoStorageService } from '@po-ui/ng-storage';

import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../../interface/auth';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private poStorageService :PoStorageService
  ) {}
  ngOnInit() {
  }


  public submitLogin(row: LoginPage): void {
    this.authService.postLogin(row).subscribe(
      (ret)=> {
        sessionStorage.setItem('auth-token',ret.items.token);
        sessionStorage.setItem('auth-refreshtoken',ret.items.refresh_token);
        this.router.navigateByUrl('/')
      }
    )
  }

}
