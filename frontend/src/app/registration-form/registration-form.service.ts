import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class RegistrationFormService {
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    constructor(private http: HttpClient) { }

    postDataToServer(username: string, password: string): Observable<any> {
      return this.http.post<any>('http://localhost:8080/users/registration', {username, password});
    }

    sendToken(token){
      return this.http.post<any>('http://localhost:8080/api/token_validate', {recaptcha: token});
    }
  }