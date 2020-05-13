/*
  RedirectAfterTransactionComponent - contains functions for redirect back to e-shop
  attributes:
    - redirectURL
    - server
    - protocol
  methods:
    - ngOnInit
    - onSubmit
*/
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-redirect-after-transaction',
  templateUrl: './redirect-after-transaction.component.html',
  styleUrls: ['./redirect-after-transaction.component.sass']
})
export class RedirectAfterTransactionComponent implements OnInit {
  redirectURL: string;
  server: string;
  protocol: string;

  constructor(
    private sharedService: SharedServiceService
  ) { }

  /*
    ngOnInit - void function
      - init shared variables from SharedServiceService
  */
  ngOnInit() {
    this.sharedService.currentServer.subscribe(server => this.server = server);
    this.sharedService.currentProtocol.subscribe(protocol => this.protocol = protocol);
    this.sharedService.currentURL.subscribe(redirectURL => this.redirectURL = redirectURL);

  }

  /*
    onSubmit - void function
      - redirect user to succesfull/unsuccessfull e-shop page provided by e-shop
  */
  onSubmit()
  {
    //location.href = 'http://192.168.56.1:8081/blockchain-e-shop_success.html';
    location.href = this.protocol + '://' + this.server + '/' + this.redirectURL;
  }

}
