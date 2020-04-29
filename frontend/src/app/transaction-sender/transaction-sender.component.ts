/*
  TransactionSenderComponent - contains functions for transaction view and redirect back to e-shop
  Commands to to install and run e-shop:
    - for install of server: run "npm install http-server -g" in blockchain-e-shop folder
    - for runnning of server: run "http-server -p 8081 -o blockchain-e-shop.html" in blockchain-e-shop folder
    - after these commands, click server address, on which the server is running, from command line
  attributes:
    - transactionSenderService
    - error
    - inputFields
    - formInputs
    - transactionTypes
    - selectedType
    - sellerWallet
    - price
    - feeWallet
    - fees
    - walletsInputs
  methods:
    - ngOnInit
    - changeFields
    - addInputRow
    - removeInputRow
    - getTransactionTypes
    - getSellerWallet
    - sendForm
    - isValidBeforeSend
    - redirectForFailure
    - redirectForSuccess
*/

import { Component, OnInit } from '@angular/core';
import { TransactionSenderService } from './transaction-sender.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-transaction-sender',
  templateUrl: './transaction-sender.component.html',
  styleUrls: ['./transaction-sender.component.sass']
})
export class TransactionSenderComponent implements OnInit {
  error;
  inputFields;
  formInputs;
  transactionTypes;
  selectedType;
  sellerWallet;
  price;
  feeWallet;
  fees;
  walletsInputs;
  merchantId: string;
  orderId: string;
  priceBackend: number;
  redirectURLOnSuccess: string;
  redirectURLOnFailure: string;
  server: string;
  protocol: string;
  constructor(
    private transactionSenderService: TransactionSenderService,
    private route: ActivatedRoute,
    private cookieService: CookieService) { }

  /*
    ngOnInit - void function
      - init view for transactions, get all transaction types from backend
  */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.merchantId = params.get('merchantId');
      this.orderId = params.get('orderId');
      this.priceBackend = parseInt(params.get('price'), 10);
      this.redirectURLOnFailure = params.get('redirectURL1');
      this.redirectURLOnSuccess = params.get('redirectURL2');
      this.server = params.get('server');
      this.protocol = params.get('protocol');
      this.getTransactionTypes();
    });
    if (this.priceBackend !== undefined && !isNaN(this.priceBackend)) {
      this.price = this.priceBackend;
    } else {
      // TODO: redirect
      alert('Bad price!');
    }
  }

  /*
    redirectForFailure - void function
      - method is called when transaction is not successful
      - redirects buyer back to e-shop
  */
  redirectForFailure(){
      location.href = this.protocol + '://' + this.server + '/' + this.redirectURLOnFailure
  }

  /*
    redirectForSuccess - void function
      - method is called when transaction is successful
      - redirects buyer back to e-shop
  */
  redirectForSuccess(){
      location.href = this.protocol + '://' + this.server + '/' + this.redirectURLOnSuccess
  }

  /*
    changeFields - void function
      - method is called when transaction type is changed
      - change input fields for selected transaction types and seller wallet address
  */
  changeFields() {
    this.transactionSenderService.getTransactionFields(this.selectedType).subscribe(
      data => {
        this.inputFields = JSON.parse(JSON.stringify(data));
        this.formInputs = [JSON.parse(JSON.stringify(this.inputFields))];
        this.walletsInputs = [1];
        this.getSellerWallet();
      },
      error => this.error = error
    );
  }

  /*
    addInputRow - void function
      - add row for input wallet with address, wif and input value
  */
  addInputRow() {
    this.formInputs.push(JSON.parse(JSON.stringify(this.inputFields)));
    this.walletsInputs.push(1);
  }

  /*
    removeInputRow - void function
      - delete row for input on index wallet
    params:
      index - index of row, where minus sign was clicked
  */
  removeInputRow(index) {
    this.formInputs.splice(index, 1);
    this.walletsInputs.splice(index, 1);
  }

  /*
    getTransactionTypes - void function
      - get all transaction types
      - get fields for selected transaction types
      - init seller wallet address
  */
  getTransactionTypes() {
    this.transactionSenderService.getTransactionTypes().subscribe(
      response => {
        this.transactionTypes = response;
        this.transactionSenderService.getSellerPrimaryWallet(this.merchantId).subscribe(data => {
          if (data.primary !== 'failed' && data.primary.length !== 0) {
            this.selectedType = data.primary[0].type_name;
          } else {
            this.selectedType = response[0].type_name;
          }
          this.walletsInputs = [1];
          this.changeFields();
        });
      },
      error => this.error = error
    );
  }

  /*
    getSellerWallet - void function
      - fill this.sellerWallet which represents seller wallet address in selected transaction type based on this.selectedType
  */
  getSellerWallet() {
    this.transactionSenderService.getSellerWallet(this.selectedType, this.merchantId).subscribe(data => {
      if (data.wallet !== 'failed') {
        this.sellerWallet = data.wallet;
      } else {
        alert('Non existing merchant or wallet in currency not exists!');
        this.sellerWallet = '';
      }
    },
    error => this.error = error
    );
  }

  /*
    sendForm - void function
      - send transaction to the net based on this.selectedType
    throws:
      alert - show response message from server
  */
  sendForm() {
    if (!this.isValidBeforeSend()) {
      return;
    }
    const data = {
      input_wallets: this.formInputs,
      output_wallet: this.sellerWallet,
      price: this.price,
      fees: this.fees,
      fee_wallet: this.feeWallet,
      wallets_inputs: this.walletsInputs,
      merchantId: this.merchantId,
      orderId: this.orderId
    };
    this.transactionSenderService.sendForm(this.selectedType, data).subscribe(
      response => {
        for (let i = 1; i < data.input_wallets.length + 1; i++) {
          this.cookieService.set(i +  '.' + data.input_wallets[i - 1][0].field_display, data.input_wallets[i - 1][0].value);
        }
        alert(response.message);
        setTimeout(() => 
        {
          this.redirectForSuccess();
        },
        3000);
      },
      error => {
        alert(error);
        setTimeout(() => 
        {
          this.redirectForFailure();
        },
        3000);
      }
    );
  }

  getSellerPrimaryWallet() {
    return this.transactionSenderService.getSellerPrimaryWallet(this.merchantId);
  }

  /*
    isValidBeforeSend - boolean function
      - checks if all form fields are filled
    returns:
      true - if form is valid
      false - if form is not valid - all fields are not filled
    throws:
      alert - which field is not filled
  */
  isValidBeforeSend() {
    if (this.selectedType === 'ETH' || this.selectedType === 'ETC') {
      alert('Not supported!');
      return false;
    }
    if (this.sellerWallet === undefined || this.sellerWallet === null || this.sellerWallet === '') {
      alert('Non existing wallet in selected currency for seller!');
      return false;
    }
    if (this.priceBackend === undefined || this.priceBackend === null || this.priceBackend <= 0) {
      alert('Fill non-negative price!');
      return false;
    }
    if (this.feeWallet === undefined || this.feeWallet === null ||
      this.feeWallet <= 0 || this.feeWallet > this.formInputs.length || this.feeWallet === '') {
      alert('Fill correct fee wallet order!');
      return false;
    }
    if (this.fees === undefined || this.fees === null || this.fees <= 0 || this.fees === '') {
      alert('Fill non-negative fees!');
      return false;
    }
    const addresses = [];
    const wifs = [];
    this.formInputs.forEach((wallet, index) => {
      if (wallet[0].value === undefined || wallet[0].value === null || wallet[0].value === '') {
        addresses.push(index + 1);
      }
      if (wallet[1].value === undefined || wallet[1].value === null || wallet[1].value === '') {
        wifs.push(index + 1);
      }
    });
    if (addresses.length > 0) {
      alert('Fill addresses on rows: ' + addresses + '!');
      return false;
    }
    if (wifs.length > 0) {
      alert('Fill wifs on rows: ' + wifs + '!');
      return false;
    }
    const inputs = [];
    let priceSum = 0;
    this.walletsInputs.forEach((input, index) => {
      if (input === undefined || input === null || input <= 0 || input === '') {
        inputs.push(index + 1);
      } else {
        priceSum += input;
      }
    });
    if (inputs.length > 0) {
      alert('Fill inputs on rows: ' + inputs + '!');
      return false;
    }
    if (priceSum !== (this.priceBackend)) {
      alert('Input ' + priceSum + ' is not equal to price of order ' + this.priceBackend + ' with fees ' + this.fees + '!' + '\n'
        + 'Missing value is ' + (this.priceBackend + this.fees - priceSum));
      return false;
    }
    return true;
  }
}
