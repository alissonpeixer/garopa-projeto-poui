import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteCrud } from './intereface/cliente-crud';

@Component({
  selector: 'app-compras-cliente-crud',
  templateUrl: './compras-cliente-crud.component.html',
  styleUrls: ['./compras-cliente-crud.component.css']
})
export class ComprasClienteCrudComponent implements OnInit {

  dadosClienteCrud: ClienteCrud;

  constructor(
    private clienteService : ClienteService
  ) {
    this.dadosClienteCrud = new ClienteCrud();
  }

  @ViewChild('formCadastro', {static: true}) formCadastro! : NgForm

  ngOnInit() {
  }


  formValid(): boolean {
    return Boolean(this.formCadastro.invalid);
  }

  handleSubmit(): void {
    this.clienteService.postCliente(this.dadosClienteCrud).subscribe(ret=> console.log(ret))
  }
}
