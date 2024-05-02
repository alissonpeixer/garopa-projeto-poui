import { Component, OnInit } from '@angular/core';
import { PoMenuItem, PoToolbarAction, PoDialogService } from '@po-ui/ng-components';

import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent implements OnInit {


  public readonly poMenuItem: Array<PoMenuItem>;
  public readonly poProfileAction: Array<PoToolbarAction>;


  constructor(
    private router: Router,
    private poDialogService: PoDialogService,
    private tokenStorageService: TokenStorageService,
  ){

    this.poProfileAction = [
      { label: 'Sair', icon:'po-icon-exit', type: 'danger', action: this.userLogout.bind(this) },
    ];

    this.poMenuItem = [
      {
        label: 'Compras',
        icon: 'po-icon-handshake',
        subItems: [
          {
            label: 'Clientes',
            icon: 'po-icon-user',
            subItems: [
              { label: 'Lista',   link:'/compras/cliente' },
              { label: 'Incluir', link:'/compras/cliente/incluir' },
            ]
          },
          {
            label: 'Fornecedor',
            subItems: [
              { label: 'Lista',   link:'/compras/fornecedor' },
              { label: 'Incluir', link:'/compras/fornecedor/incluir' },
            ]
          }
        ]
      },
    ];

  }

  ngOnInit() {
  }


  private userLogout(): void {
    this.poDialogService.confirm({
      title: 'Sair',
      message: 'Deseja relamente deslogar?',
      confirm: ()=> {
        this.tokenStorageService.clearTokens();
        this.router.navigateByUrl('/login');
      }
    })
  }

}
