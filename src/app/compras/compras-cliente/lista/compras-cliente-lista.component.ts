import { ClienteService } from './../../../../services/cliente.service';
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

  tabelaPrincipalDados: Array<Cliente> = [];

  constructor(
    private routers: Router,
    private clienteService: ClienteService
  ){}

  public readonly actionsTela: Array<PoPageAction> = [
    { label: 'Incluir', action: this.goToIncluir.bind(this) }
  ];

  public readonly tabelaPrincipalActions: Array<PoTableAction> = [
    { label: 'Editar', action: this.goToRegistro.bind(this) }
  ];

  public readonly tabelaPrincipalColumns: Array<PoTableColumn> = [
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

  ngOnInit() {
    this.loadDados();
  }

  loadDados(): void {
    this.clienteService.getClienteLista().subscribe(
      (ret)=> {
        this.tabelaPrincipalDados = ret.items;
      }
    );
  }

  goToIncluir(): void {
    this.routers.navigate(['compras','cliente','incluir'])
  }

  goToRegistro(row: Cliente): void {
    this.routers.navigate(['compras','cliente','editar',row.id])
  }

}
