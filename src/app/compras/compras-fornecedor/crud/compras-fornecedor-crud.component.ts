import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from '../../../../interface/fornedor';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../../../services/fornecedor.service';
import { environment } from '../../../../environments/environment';
import { PoBreadcrumb, PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-compras-fornecedor-crud',
  templateUrl: './compras-fornecedor-crud.component.html',
  styleUrl: './compras-fornecedor-crud.component.css',
  standalone: false
})
export class ComprasFornecedorCrudComponent implements OnInit {

  public readonly paginaBreadcrumb: PoBreadcrumb;

  public dadosFornecedor: Fornecedor;

  public readonly apiEnvironment: string;
  public telaEditar: boolean;
  public labelButton: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poDialogService: PoDialogService,
    private fornecedorService: FornecedorService,
  ){

    this.telaEditar = false;
    this.labelButton = '';
    this.apiEnvironment = environment.api;

    this.dadosFornecedor = new Fornecedor();


    this.paginaBreadcrumb = {
      items: [
        { label: 'Compras' },
        { label: 'Fornecedor - Lista', action: this.goToLista.bind(this) },
        { label: 'Crud' }
      ]
    }
  }

  @ViewChild('formCadastro', {static: true}) formCadastro! : NgForm

  ngOnInit() {
    this.montaTelaCrud();
  }


  private montaTelaCrud(): void {
    this.activatedRoute.params.subscribe(
      (ret)=> {
        if(ret['TIPO'] === 'editar' && ret['ID']){

          this.telaEditar = true;
          this.labelButton = 'Atualizar';

          this.loadDados(ret['ID']);

        } else {

          this.labelButton = 'Cadastrar';

        }
      }
    );
  }

  public formValid(): boolean {
    return Boolean(this.formCadastro.invalid);
  }

  private loadDados(ID: string): void {
    this.fornecedorService.getFornecedorById(ID).subscribe(
      (ret)=> {
        this.dadosFornecedor = ret;
      }
    );
  }

  public handleSubmit(): void {
    this.poDialogService.confirm({
      title: `${this.labelButton} `,
      message: `Deseja relamente ${this.labelButton} este cadastro?`,
      confirm: ()=> {
        if(this.telaEditar) {
          this.fornecedorService.putFornecedor(this.dadosFornecedor).subscribe(
            (ret)=> {
              this.dadosFornecedor = ret.items;
            }
          );
        } else {
          this.fornecedorService.postFornecedor(this.dadosFornecedor).subscribe(
            (ret)=> {
              this.goToLista();
            }
          );
        }
      }
    });
  }

  public handleRemove(): void {
    this.poDialogService.confirm({
      title: 'Remover',
      message: 'Deseja relamente remover este cadastro?',
      confirm: ()=> {
        this.fornecedorService.deleteFornecedorById(this.dadosFornecedor.id).subscribe(
          (ret)=> {
            this.goToLista();
          }
        );
      }
    });
  }

  private goToLista(): void {
    this.router.navigate(['compras','fornecedor']);
  }

}
