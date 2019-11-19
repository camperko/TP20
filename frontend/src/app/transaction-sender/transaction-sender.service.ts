import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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

  getResponseFromServer(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/test');
  }

  postDataToServer(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/test', JSON.stringify(data), this.httpOptions);
  }

  // get transaction type input fields
  getInputFields(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/getTransactionFields');
  }

  // send data from input fields
  sendForm(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/sendTransactionFields', JSON.stringify(data), this.httpOptions);
  }
}
