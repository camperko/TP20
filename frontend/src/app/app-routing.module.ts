import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { HomeSellerComponent } from './home-seller';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { MainContextComponent } from './main-context';

const routes: Routes = [
  { path: 'user/home', component: HomeSellerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
