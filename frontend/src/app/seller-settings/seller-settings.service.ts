import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionSenderService} from '@app/transaction-sender/transaction-sender.service';

@Injectable({
  providedIn: 'root'
})
export class SellerSettingsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  merchantId: number;

  transactionTypes = [];

  constructor(private http: HttpClient, private transactionSenderService: TransactionSenderService) {
    this.transactionSenderService.getTransactionTypes().subscribe(data => {
      this.transactionTypes = data;
    });
    // TODO: by cookies
    this.merchantId = 1;
  }

  getSellerWallets(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/seller/' + this.merchantId + '/wallets');
  }

  deleteWallet(walletId: number): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/seller/wallet/delete/' + walletId);
  }

  createWallet(walletAddress: string, transTypeId): Observable<any> {
    const data = {
      wallet_address: walletAddress,
      trans_type_id: transTypeId
    };
    return this.http.post<any>('http://localhost:8080/seller/' + this.merchantId + '/wallet/create', JSON.stringify(data), this.httpOptions);
  }

  updateWallet(walletId: number, walletAddress: string, transTypeId: string): Observable<any> {
    const data = {
      wallet_address: walletAddress,
      trans_type_id: transTypeId
    };
    return this.http.put<any>('http://localhost:8080/seller/wallet/update/' + walletId, JSON.stringify(data), this.httpOptions);
  }

  updatePrimaryWallet(walletId: number): Observable<any> {
    const data = {
      wallet_id: walletId
    };
    return this.http.put<any>('http://localhost:8080/seller/' + this.merchantId + '/wallet/update/primary', JSON.stringify(data), this.httpOptions);
  }

  unsetPrimaryWallet(walletId: number): Observable<any> {
    const data = {
      wallet_id: walletId
    }
    return this.http.put<any>('http://localhost:8080/seller/wallet/unset_primary', JSON.stringify(data), this.httpOptions);
  }
}
