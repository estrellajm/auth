import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HomeComponent,
    UserComponent
  ]
})
export class ComponentsModule { }
