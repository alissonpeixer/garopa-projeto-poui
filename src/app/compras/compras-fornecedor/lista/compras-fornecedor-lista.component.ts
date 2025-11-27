import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

import { environment } from '../../../../environments/environment';
import { FornecedorService } from './../../../../services/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../../../../interface/fornedor';

@Component({
  selector: 'app-compras-fornecedor-lista',
  templateUrl: './compras-fornecedor-lista.component.html',
  styleUrls: ['./compras-fornecedor-lista.component.css'],
  standalone: false
})
export class ComprasFornecedorListaComponent implements OnInit {

  public readonly apiEnvironment: string;
  public readonly  actionsTela: Array<PoPageAction>;
  public readonly  actionsTabelaPrincipal: Array<PoTableAction>;
  public readonly  colunasTabelaPrincipal: Array<PoTableColumn>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fornecedorService: FornecedorService,
  ) {


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
      { property: 'created_at', label: 'Criado em', type: 'date' }
    ];

  }

  ngOnInit() {
  }


  private goToIncluir(): void {
    this.router.navigate(['compras','fornecedor','incluir'])
  }

  private goToRegistro(row: Fornecedor): void {
    this.router.navigate(['compras','fornecedor','editar',row.id])
  }

}
