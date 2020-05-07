import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private redirectURLOnSuccess = new BehaviorSubject('');
  private redirectURLOnFailure = new BehaviorSubject('');
  private protocol = new BehaviorSubject('');
  private server = new BehaviorSubject('');

  currentSuccessURL = this.redirectURLOnSuccess.asObservable();
  currentFailURL = this.redirectURLOnFailure.asObservable();
  currentProtocol = this.protocol.asObservable();
  currentServer = this.server.asObservable();

  constructor() { }
}
