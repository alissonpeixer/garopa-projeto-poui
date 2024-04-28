import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent implements OnInit {

  constructor(){}

  ngOnInit() {
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Compras', subItems: [
        { label: 'Clientes',
          subItems: [
            { label: 'Lista', link:'/compras/cliente' },
            { label: 'Incluir', link:'/compras/incluir' },
          ]
         },
      ]
    }
  ];
}
