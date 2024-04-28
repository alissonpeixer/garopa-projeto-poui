import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras-cliente-lista',
  templateUrl: './compras-cliente-lista.component.html',
  styleUrls: ['./compras-cliente-lista.component.css']
})
export class ComprasClienteListaComponent implements OnInit {

  constructor(
    private routers: Router
  ){}

  ngOnInit() {
    this.loadTelaCrud();
  }

  private loadTelaCrud(): void {

  }

  private loadDados(): void {

  }

}
