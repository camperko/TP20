import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { MainContextComponent } from './main-context/main-context.component';
import { HomeComponent } from './home';
import { HomeSellerComponent } from './home-seller';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { SellerSettingsComponent } from '@app/seller-settings/seller-settings.component';
import { RedirectAfterTransactionComponent } from './redirect-after-transaction/redirect-after-transaction.component';

const routes: Routes = [
  { path: 'user/home', component: HomeSellerComponent, canActivate: [AuthGuard] },
  { path: 'user/settings', component: SellerSettingsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'transaction', component: MainContextComponent },
  { path: 'transaction/:merchantId/:orderId/:price', component: MainContextComponent },
  { path: 'transaction/redirect', component: RedirectAfterTransactionComponent },
  { path: 'transaction/:merchantId/:orderId/:price/:protocol/:server/:redirectURL1/:redirectURL2', component: MainContextComponent },
  { path: '', component: HomeComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
