import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects, CustomSerializer } from "./store";
import { UserComponent } from './components/user/user.component';
import { ComponentsModule } from './components/components.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
