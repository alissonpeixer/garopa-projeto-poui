import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Cliente } from '../../../../interface/cliente';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-compras-cliente-lista',
  templateUrl: './compras-cliente-lista.component.html',
  styleUrls: ['./compras-cliente-lista.component.css'],
  standalone: false
})
export class ComprasClienteListaComponent implements OnInit {

  public readonly  actionsTela: Array<PoPageAction>;
  public readonly  actionsTabelaPrincipal: Array<PoTableAction>;
  public readonly  colunasTabelaPrincipal: Array<PoTableColumn>;
  public readonly  apiEnvironment: string;

  constructor(
    private routers: Router
  ){

    this.apiEnvironment = environment.api;

    this.actionsTela = [
      { label: 'Incluir', action: this.goToIncluir.bind(this) }
    ];

    this.actionsTabelaPrincipal = [
      { label: 'Editar', action: this.goToRegistro.bind(this) }
    ];

    this.colunasTabelaPrincipal = [
      { property: 'id', label: 'Codigo', type: 'string'    },
      { property: 'nome', label: 'Nome', type: 'string'    },
      { property: 'cip', label: 'CPF/CNPJ', type: 'string' },
      { property: 'tipo', label: 'Tipo', type: 'subtitle',
        subtitles: [
          { value: 'F', label: 'Fisica', content: 'F', color: 'color-01'  },
          { value: 'J', label: 'Juridica', content: 'J', color: 'color-10'  },
        ]
      },
      { property: 'created_at', label: 'Criado em', type: 'date' }
    ];
  }

  ngOnInit() {

  }

  private loadDados(): void {

  }

  private goToIncluir(): void {
    this.routers.navigate(['compras','cliente','incluir'])
  }
  private goToRegistro(row: Cliente): void {
    this.routers.navigate(['compras','cliente','editar',row.id])
  }

}
