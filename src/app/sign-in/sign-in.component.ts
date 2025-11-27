import { TokenStorageService } from './../../services/token-storage.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../../interface/auth';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: false
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
  ) {}

  ngOnInit() {
  }

  submitLogin(row: LoginPage): void {
    this.authService.postLogin(row).subscribe(
      (ret)=> {
        this.tokenStorageService.saveToken(ret.items.token);
        this.tokenStorageService.saveRefreshToken(ret.items.refresh_token);
        this.router.navigateByUrl('/')
      }
    )
  }

}
