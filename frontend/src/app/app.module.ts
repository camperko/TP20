import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MainContextComponent } from './main-context/main-context.component';
import { TransactionSenderComponent } from './transaction-sender/transaction-sender.component';
import { TransactionSenderService } from './transaction-sender/transaction-sender.service';
import { ExchangeRatesTableComponent } from './exchange-rates-table/exchange-rates-table.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationFormService } from './registration-form/registration-form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeSellerComponent } from './home-seller/home-seller.component';
import { NavigationSellerComponent } from './navigation-seller/navigation-seller.component';
import { NavigationTransparentComponent } from './navigation-transparent/navigation-transparent.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { MatPaginatorModule } from '@angular/material';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { TransactionHistorySummaryComponent } from './transaction-history-summary/transaction-history-summary.component';
import { TransactionHistorySummaryService } from './transaction-history-summary/transaction-history-summary.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule, MatInputModule,
    MatListModule, MatSelectModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { SellerSettingsComponent } from './seller-settings/seller-settings.component';
import {FlexModule} from '@angular/flex-layout';
import { DeleteDialogComponent } from './seller-settings/dialogs/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './seller-settings/dialogs/create-dialog/create-dialog.component';
import { EditDialogComponent } from './seller-settings/dialogs/edit-dialog/edit-dialog.component';
import { ExchangeRatesChartComponent } from './exchange-rates-chart/exchange-rates-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TransactionHistoryStatisticsComponent } from './transaction-history-statistics/transaction-history-statistics.component';
import { TransactionHistoryStatisticsService } from './transaction-history-statistics/transaction-history-statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    MainContextComponent,
    TransactionSenderComponent,
    ExchangeRatesTableComponent,
    RegistrationFormComponent,
    LoginComponent,
    HomeComponent,
    HomeSellerComponent,
    NavigationSellerComponent,
    NavigationTransparentComponent,
    TransactionHistoryComponent,
    TransactionHistorySummaryComponent,
    NavigationTransparentComponent,
    SellerSettingsComponent,
    DeleteDialogComponent,
    CreateDialogComponent,
    EditDialogComponent,
    ExchangeRatesChartComponent,
    TransactionHistoryStatisticsComponent
  ],
    imports: [
        MatFormFieldModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        FlexModule,
        MatCheckboxModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatTableModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        NgxChartsModule
    ],
    entryComponents: [
      DeleteDialogComponent,
      EditDialogComponent,
      CreateDialogComponent
    ],
  providers: [
    TransactionSenderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'accent' }},

    // provider used to create fake backend
    // fakeBackendProvider
    RegistrationFormService,
    ReactiveFormsModule,
    CookieService,
    TransactionHistoryService,
    TransactionHistorySummaryService,
    TransactionHistoryStatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
