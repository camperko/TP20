import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
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
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    MainContextComponent,
    TransactionSenderComponent,
    TransactionReceiverComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    TransactionSenderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
