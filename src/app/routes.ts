import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthGuard } from "./auth/auth.guard";

import { ComprasClienteListaComponent } from "./compras/compras-cliente/lista/compras-cliente-lista.component";
import { ComprasClienteCrudComponent } from "./compras/compras-cliente/crud/compras-cliente-crud.component";

import { ComprasFornecedorCrudComponent } from "./compras/compras-fornecedor/crud/compras-fornecedor-crud.component";
import { ComprasFornecedorListaComponent } from "./compras/compras-fornecedor/lista/compras-fornecedor-lista.component";


export const routers : Routes = [
  { path: 'login'      , component: SignInComponent, canActivate: [ AuthGuard ]   },
  { path: ''         , component: MainComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'compras/cliente', component: ComprasClienteListaComponent },
      { path: 'compras/cliente/incluir', component: ComprasClienteCrudComponent },
      { path: 'compras/cliente/:TIPO/:ID', component: ComprasClienteCrudComponent },
      { path: 'compras/fornecedor', component: ComprasFornecedorListaComponent },
      { path: 'compras/fornecedor/incluir', component: ComprasFornecedorCrudComponent },
      { path: 'compras/fornecedor/:TIPO/:ID', component: ComprasFornecedorCrudComponent },
    ]
  },
];
