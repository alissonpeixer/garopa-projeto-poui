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

  labelButton: string = '';
  telaEditar: boolean = false;
  dadosClienteCrud: Cliente = new Cliente();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService : ClienteService,
    private poDialogService: PoDialogService,
  ) {}

  @ViewChild('formCadastro', {static: true}) formCadastro! : NgForm

  public readonly paginaBreadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Compras' },
      { label: 'Cliente - Lista', action: this.goToLista.bind(this) },
      { label: 'Crud' }
    ]
  };

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

  loadDados(id: number): void {
    this.clienteService.getClienteById(id).subscribe(
      (ret)=> (this.dadosClienteCrud = ret)
    );
  }


  formValid(): boolean {
    return Boolean(this.formCadastro.invalid);
  }

  handleSubmit(): void {
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

  handleRemove(): void {
    this.poDialogService.confirm({
      title: 'Remover',
      message: 'Deseja relamente remover este cadastro?',
      confirm: ()=> {
        this.clienteService.deleteClienteById(this.dadosClienteCrud.id).subscribe(ret=> this.router.navigateByUrl('/compras/cliente'));
      }
    });
  }


  goToLista(): void {
    this.router.navigate(['compras','cliente']);
  }


}
