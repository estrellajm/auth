import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from '@core/auth/auth.module';

const routes: Routes = [
  {
    // path: 'user',
    // canActivate: [fromGuards.AuthGuard],
    // component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  declarations: []
})
export class CoreModule { }
