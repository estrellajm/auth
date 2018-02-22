import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

// guards
import * as fromGuards from '@core/store/guards';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [fromGuards.AuthGuard],
    component: HomeComponent
  },
  {
    path: 'dashboard',
    canActivate: [fromGuards.AuthGuard],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HomeComponent,
    DashboardComponent
  ]
})
export class ComponentsModule { }
