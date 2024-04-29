import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { ClienteCrud } from '../crud/intereface/cliente-crud';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-compras-cliente-lista',
  templateUrl: './compras-cliente-lista.component.html',
  styleUrls: ['./compras-cliente-lista.component.css']
})
export class ComprasClienteListaComponent implements OnInit {

  public readonly  poTableAction: Array<PoTableAction>;
  public readonly  poTableColumn: Array<PoTableColumn>;
  public readonly  apiEnvironment: string;

  constructor(
    private routers: Router
  ){

    this.apiEnvironment = environment.api;

    this.poTableAction = [
      { label: 'Editar', action: this.goToRegistro.bind(this) }
    ];

    this.poTableColumn = [
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

  private goToRegistro(row: ClienteCrud): void {
    this.routers.navigate(['/compras/editar',row.id])
  }

}
