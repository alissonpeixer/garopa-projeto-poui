import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../../../interface/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-compras-cliente-crud',
  templateUrl: './compras-cliente-crud.component.html',
  styleUrls: ['./compras-cliente-crud.component.css'],
  standalone: false
})
export class ComprasClienteCrudComponent implements OnInit {

  public readonly paginaBreadcrumb: PoBreadcrumb;

  public labelButton: string;
  public telaEditar: boolean;

  public dadosClienteCrud: Cliente;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService : ClienteService,
    private poDialogService: PoDialogService,
  ) {
    this.dadosClienteCrud = new Cliente();
    this.labelButton = '';
    this.telaEditar = false;

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

  private loadDados(id: number): void {
    this.clienteService.getClienteById(id).subscribe(
      (ret)=> (this.dadosClienteCrud = ret)
    );
  }


  public formValid(): boolean {
    return Boolean(this.formCadastro.invalid);
  }

  public handleSubmit(): void {
    this.poDialogService.confirm({
      title: `${this.labelButton} `,
      message: `Deseja relamente ${this.labelButton} este cadastro?`,
      confirm: ()=> {
        if(this.telaEditar) {

          this.clienteService.putCliente(this.dadosClienteCrud).subscribe(ret=> (this.dadosClienteCrud = ret.items));
        } else {
          this.clienteService.postCliente(this.dadosClienteCrud).subscribe(ret=> this.router.navigateByUrl('/compras/cliente'));
        }
      }
    });
  }

  public handleRemove(): void {
    this.poDialogService.confirm({
      title: 'Remover',
      message: 'Deseja relamente remover este cadastro?',
      confirm: ()=> {
        this.clienteService.deleteClienteById(this.dadosClienteCrud.id).subscribe(ret=> this.router.navigateByUrl('/compras/cliente'));
      }
    });
  }


  private goToLista(): void {
    this.router.navigate(['compras','cliente']);
  }


}
