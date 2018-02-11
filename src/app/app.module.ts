import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
const firebase = environment.firebase;

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects, CustomSerializer } from "./core/store";

import { ComponentsModule } from './components/components.module';

// guards
import * as fromGuards from './core/store/guards';

// Services
import * as fromServices from './core/store/services';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes),

    CoreModule,
    ComponentsModule,

    AngularFireModule.initializeApp(firebase, 'Custom'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }, ...fromGuards.guards, ...fromServices.services],
  bootstrap: [AppComponent]
})
export class AppModule { }
