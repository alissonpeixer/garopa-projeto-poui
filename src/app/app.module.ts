import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from "./auth/auth.guard";
import { Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { SignInComponent } from './sign-in/sign-in.component';
import { PoStorageModule } from '@po-ui/ng-storage';
import { AuthInterceptor } from './auth/authInterceptor.guard';
import { ComprasClienteListaComponent } from './compras/compras-cliente/lista/compras-cliente-lista.component';
import { ComprasClienteCrudComponent } from './compras/compras-cliente/crud/compras-cliente-crud.component';
import { FormsModule } from '@angular/forms';
import { ComprasFornecedorCrudComponent } from './compras/compras-fornecedor/crud/compras-fornecedor-crud.component';
import { ComprasFornecedorListaComponent } from './compras/compras-fornecedor/lista/compras-fornecedor-lista.component';
import { MainComponent } from './main/main.component';

const routers : Routes = [
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


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    ComprasClienteListaComponent,
    ComprasClienteCrudComponent,
    ComprasFornecedorCrudComponent,
    ComprasFornecedorListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    PoTemplatesModule,
    PoStorageModule.forRoot({
      name: 'central',
      storeName: '_mystore',
      driverOrder: ['lokijs', 'websql', 'indexeddb', 'localstorage']
    }),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
