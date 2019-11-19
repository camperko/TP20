import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MainContextComponent } from './main-context/main-context.component';
import { TransactionSenderComponent } from './transaction-sender/transaction-sender.component';
import { TransactionReceiverComponent } from './transaction-receiver/transaction-receiver.component';

import { TransactionSenderService } from './transaction-sender/transaction-sender.service';
import { LoginComponent } from './login';
import { HomeComponent } from './home';

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
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    TransactionSenderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
