import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-redirect-after-transaction',
  templateUrl: './redirect-after-transaction.component.html',
  styleUrls: ['./redirect-after-transaction.component.sass']
})
export class RedirectAfterTransactionComponent implements OnInit {

  constructor(
    private SharedService: SharedServiceService
  ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    alert(this.SharedService.currentSuccessURL);
    //location.href = 'http://192.168.56.1:8081/blockchain-e-shop_success.html';
    location.href = this.SharedService.currentProtocol + '://' + this.SharedService.currentServer + '/' + this.SharedService.currentSuccessURL;

    /*this.sharedService.currentServer.subscribe(server => this.server = server);
      this.sharedService.currentProtocol.subscribe(protocol => this.protocol = protocol);
      this.sharedService.currentFailURL.subscribe(redirectURLOnFailure => this.redirectURLOnFailure = redirectURLOnFailure);
      this.sharedService.currentSuccessURL.subscribe(redirectURLOnSuccess => this.redirectURLOnSuccess = redirectURLOnSuccess);

      this.router.navigate(["transaction/redirect"]);*/
  }

}
