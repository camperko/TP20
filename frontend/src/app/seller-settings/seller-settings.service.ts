import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionSenderService} from '@app/transaction-sender/transaction-sender.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SellerSettingsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  merchantId: string;
  merchantEmail: string;
  transactionTypes = [];

  constructor(private http: HttpClient, private transactionSenderService: TransactionSenderService,
              private cookieService: CookieService) {
    this.merchantId = this.cookieService.get('id');
    this.getEmail().subscribe(data => {
      if (data.email === 'failed') {
        this.merchantEmail = '';
      } else {
        this.merchantEmail = data.email;
      }
    });
    this.transactionSenderService.getTransactionTypes().subscribe(data => {
      this.transactionTypes = data;
    });
  }

  getSellerWallets(): Observable<any> {
    return this.http.get<any>('https://blockpayapi.azurewebsites.net/seller/' + this.merchantId + '/wallets');
  }

  deleteWallet(walletId: number): Observable<any> {
    return this.http.delete<any>('https://blockpayapi.azurewebsites.net/seller/wallet/delete/' + walletId);
  }

  createWallet(walletAddress: string, transTypeId): Observable<any> {
    const data = {
      wallet_address: walletAddress,
      trans_type_id: transTypeId
    };
    return this.http.post<any>('https://blockpayapi.azurewebsites.net/seller/' + this.merchantId + '/wallet/create', JSON.stringify(data), this.httpOptions);
  }

  updateWallet(walletId: number, walletAddress: string, transTypeId: string): Observable<any> {
    const data = {
      wallet_address: walletAddress,
      trans_type_id: transTypeId
    };
    return this.http.put<any>('https://blockpayapi.azurewebsites.net/seller/wallet/update/' + walletId, JSON.stringify(data), this.httpOptions);
  }

  updatePrimaryWallet(walletId: number): Observable<any> {
    const data = {
      wallet_id: walletId
    };
    return this.http.put<any>('https://blockpayapi.azurewebsites.net/seller/' + this.merchantId + '/wallet/update/primary', JSON.stringify(data), this.httpOptions);
  }

  unsetPrimaryWallet(walletId: number): Observable<any> {
    const data = {
      wallet_id: walletId
    };
    return this.http.put<any>('https://blockpayapi.azurewebsites.net/seller/wallet/unset_primary', JSON.stringify(data), this.httpOptions);
  }

  getEmail(): Observable<any> {
    return this.http.get<any>('https://blockpayapi.azurewebsites.net/seller/' + this.merchantId + '/email');
  }
  
  changeEmail(email: string): Observable<any> {
    const data = {
      email
    };
    return this.http.put<any>('https://blockpayapi.azurewebsites.net/seller/' + this.merchantId + '/update/email', JSON.stringify(data), this.httpOptions);
  }

  changePassword(password: string): Observable<any> {
    const data = {
      userpassword: password
    };
    return this.http.put<any>('https://blockpayapi.azurewebsites.net/seller/' + this.merchantId + '/update/password', JSON.stringify(data), this.httpOptions);
  }
}
