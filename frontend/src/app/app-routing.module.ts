import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { MainContextComponent } from './main-context/main-context.component';
import { HomeComponent } from './home';
import { HomeSellerComponent } from './home-seller';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: 'user/home', component: HomeSellerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: '', component: HomeComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
