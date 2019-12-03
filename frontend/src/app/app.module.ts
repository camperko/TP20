import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MainContextComponent } from './main-context/main-context.component';
import { TransactionSenderComponent } from './transaction-sender/transaction-sender.component';
import { TransactionReceiverComponent } from './transaction-receiver/transaction-receiver.component';
import { TransactionSenderService } from './transaction-sender/transaction-sender.service';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationFormService } from './registration-form/registration-form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeSellerComponent } from './home-seller/home-seller.component';
import { NavigationSellerComponent } from './navigation-seller/navigation-seller.component';
import { NavigationTransparentComponent } from './navigation-transparent/navigation-transparent.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    MainContextComponent,
    TransactionSenderComponent,
    TransactionReceiverComponent,
    RegistrationFormComponent,
    LoginComponent,
    HomeComponent,
    HomeSellerComponent,
    NavigationSellerComponent,
    NavigationTransparentComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    TransactionSenderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
    RegistrationFormService,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
