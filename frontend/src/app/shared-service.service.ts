/*
  TransactionSenderComponent - contains functions for transaction view and redirect back to e-shop
  attributes:
    - redirectURL
    - protocol
    - server
    - currentURL
    - currentProtocol
    - currentServer
  methods:
    - changeProtocol
    - changeServer
    - changeURL
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private redirectURL = new BehaviorSubject('');
  private protocol = new BehaviorSubject('');
  private server = new BehaviorSubject('');

  currentURL = this.redirectURL.asObservable();
  currentProtocol = this.protocol.asObservable();
  currentServer = this.server.asObservable();

  constructor() { }

  /*
    changeProtocol - void function
      - method for sending protocol variable between TransactionSenderComponent a RedirectAfterTransactionComponent
  */
  changeProtocol(protocol: string)
  {
    this.protocol.next(protocol)
  }

  /*
    changeServer - void function
      - method for sending server variable between TransactionSenderComponent a RedirectAfterTransactionComponent
  */
  changeServer(server:string)
  {
    this.server.next(server)
  }

  /*
    changeURL - void function
      - method for sending redirect URL variable between TransactionSenderComponent a RedirectAfterTransactionComponent
  */
  changeURL(URL: string)
  {
    this.redirectURL.next(URL)
  }
}
