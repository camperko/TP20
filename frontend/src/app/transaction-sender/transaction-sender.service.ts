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

  getTransactionTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/transaction/types');
  }

  // get transaction type input fields
  getTransactionFields(typeName): Observable<any> {
    return this.http.get<any>('http://localhost:8080/transaction/fields/' + typeName);
  }

  // send data from input fields
  sendForm(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/sendTransactionFields', JSON.stringify(data), this.httpOptions);
  }
}
