import { Routes } from "@angular/router";
import { MasterComponent } from "./master/master.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthGuard } from "./auth/auth.guard";
import { ComprasClienteListaComponent } from "./compras/compras-cliente/lista/compras-cliente-lista.component";
import { ComprasClienteCrudComponent } from "./compras/compras-cliente/crud/compras-cliente-crud.component";


export const routers : Routes = [
  { path: 'login'      , component: SignInComponent, canActivate: [ AuthGuard ]   },
  { path: ''         , component: MasterComponent, canActivate: [ AuthGuard ],
    children: [
      { path: 'compras/cliente', component: ComprasClienteListaComponent },
      { path: 'compras/:TIPO/:ID', component: ComprasClienteCrudComponent },
      { path: 'compras/incluir', component: ComprasClienteCrudComponent },
    ]
  },
];
