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

  tabelaPrincipalDados: Array<Fornecedor> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fornecedorService: FornecedorService,
  ) {}

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
    { property: 'created_at', label: 'Criado em', type: 'date' }
  ];


  ngOnInit() {
    this.loadDados();
  }

  loadDados(): void {
    this.fornecedorService.getFornecedor().subscribe(
      (res)=> {
        this.tabelaPrincipalDados = res.items;
      }
    );
  }

  goToIncluir(): void {
    this.router.navigate(['compras','fornecedor','incluir'])
  }

  goToRegistro(row: Fornecedor): void {
    this.router.navigate(['compras','fornecedor','editar',row.id])
  }

}
