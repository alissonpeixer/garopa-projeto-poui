import { NgModule } from '@angular/core';
import { PoStorageModule } from '@po-ui/ng-storage';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    PoStorageModule.forRoot({
      name: 'central',
      storeName: '_mystore',
      driverOrder: ['lokijs', 'websql', 'indexeddb', 'localstorage']
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
