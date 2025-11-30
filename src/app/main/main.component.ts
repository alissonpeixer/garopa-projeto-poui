import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  PoMenuItem,
  PoToolbarAction,
  PoDialogService,
  PoThemeService,
  PoThemeA11yEnum
} from '@po-ui/ng-components';

import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: false
})
export class MainComponent implements OnInit {

  public readonly poMenuItem: Array<PoMenuItem> = [
    {
      label: 'Compras',
      icon: 'po-icon-handshake',
      subItems: [
        {
          label: 'Clientes',
          icon: 'po-icon-user',
          link: '/compras/cliente'
        },
        {
          label: 'Fornecedor',
          link: '/compras/fornecedor'
        }
      ]
    },
  ];

  public readonly poProfileAction: Array<PoToolbarAction> = [
    { label: 'Sair', icon: 'po-icon-exit', type: 'danger', action: this.userLogout.bind(this) },
  ];

  constructor(
    private router: Router,
    private poDialogService: PoDialogService,
    private tokenStorageService: TokenStorageService,
    private poTheme: PoThemeService
  ) {}

  ngOnInit() {
    this.poTheme.setCurrentThemeA11y(PoThemeA11yEnum.AA);
    this.poTheme.setA11yDefaultSizeSmall(true);
  }

  private userLogout(): void {
    this.poDialogService.confirm({
      title: 'Sair',
      message: 'Deseja realmente deslogar?',
      confirm: () => {
        this.tokenStorageService.clearTokens();
        this.router.navigateByUrl('/login');
      }
    });
  }
}
