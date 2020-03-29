/*
  TransactionSenderService - contains functions for http communication with backend for transactions
  attributes:
    - httpOptions
  methods:
    - getTransactionTypes
    - getTransactionFields
    - getSellerWallet
    - sendForm
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionSenderService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  /*
    getTransactionTypes - Observable<any> function
    returns:
      - array of transaction types
    method:
      - http.get - /transaction/types
  */
  getTransactionTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/transaction/types');
  }

  /*
    getTransactionFields - Observable<any> function
    params:
      - typeName - identifier of selected transaction type
    returns:
      - array of fields for selected typeName
    method:
      - http.get - /transaction/fields/{typeName}
  */
  getTransactionFields(typeName): Observable<any> {
    return this.http.get<any>('http://localhost:8080/transaction/fields/' + typeName);
  }

  /*
    getSellerWallet - Observable<any> function
    params:
      - typeName - identifier of selected transaction type
    returns:
      - output wallet for seller
    method:
      - http.get - /transaction/seller/{typeName}
  */
  getSellerWallet(typeName: string, merchantId: string): Observable<any> {
    return this.http.get<any>('http://localhost:8080/transaction/seller=' + merchantId + '/type=' + typeName);
  }

  /*
    getSellerWallet - Observable<any> function
    params:
      - typeName - identifier of selected transaction type
      - data - json of all necesary transaction fields
        - input wallets addresses, wifs and inputs + price + fees + order of wallet paying fee + output wallet address
    returns:
      - message of status report for transaction
    method:
      - http.post - /transaction/send/{typeName}
        - sending JSON.stringify(data)
  */
  sendForm(typeName, data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/transaction/send/' + typeName, JSON.stringify(data), this.httpOptions);
  }
}
