import { Component, OnInit, ViewChild } from '@angular/core';
import { Fornecedor } from '../../../../interface/fornedor';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../../../services/fornecedor.service';
import { PoBreadcrumb, PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-compras-fornecedor-crud',
  templateUrl: './compras-fornecedor-crud.component.html',
  styleUrl: './compras-fornecedor-crud.component.css',
  standalone: false
})
export class ComprasFornecedorCrudComponent implements OnInit {

  dadosFornecedor:Fornecedor = new Fornecedor();

  telaEditar: boolean = false;
  labelButton: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poDialogService: PoDialogService,
    private fornecedorService: FornecedorService,
  ){}

  @ViewChild('formCadastro', {static: true}) formCadastro! : NgForm

  public readonly paginaBreadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Compras' },
      { label: 'Fornecedor - Lista', action: this.goToLista.bind(this) },
      { label: 'Crud' }
    ]
  }

  ngOnInit() {
    this.montaTelaCrud();
  }


  montaTelaCrud(): void {
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

  loadDados(ID: string): void {
    this.fornecedorService.getFornecedorById(ID).subscribe(
      (ret)=> {
        this.dadosFornecedor = ret;
      }
    );
  }

  handleSubmit(): void {
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

  handleRemove(): void {
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

  formValid(): boolean {
    return Boolean(this.formCadastro.invalid);
  }

  goToLista(): void {
    this.router.navigate(['compras','fornecedor']);
  }

}
