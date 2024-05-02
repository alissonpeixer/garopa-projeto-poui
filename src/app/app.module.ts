import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { MasterComponent } from './master/master.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { routers } from './routes';
import { PoStorageModule } from '@po-ui/ng-storage';
import { AuthInterceptor } from './auth/authInterceptor.guard';
import { ComprasClienteListaComponent } from './compras/compras-cliente/lista/compras-cliente-lista.component';
import { ComprasClienteCrudComponent } from './compras/compras-cliente/crud/compras-cliente-crud.component';
import { FormsModule } from '@angular/forms';
import { ComprasFornecedorCrudComponent } from './compras/compras-fornecedor/crud/compras-fornecedor-crud.component';
import { ComprasFornecedorListaComponent } from './compras/compras-fornecedor/lista/compras-fornecedor-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
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
    PoStorageModule.forRoot()
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
