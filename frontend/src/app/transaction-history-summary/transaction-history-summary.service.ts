import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistorySummaryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getTransactionsSummary(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/sellersTransactionsSummary', JSON.stringify(data), this.httpOptions);
  }
}
