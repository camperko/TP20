import { Component, OnInit } from '@angular/core';
import { TransactionSenderService } from './transaction-sender.service';

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
  constructor(private transactionSenderService: TransactionSenderService) { }

  ngOnInit() {
    this.getTransactionTypes();
  }

  // get transaction type input fields
  changeFields() {
    this.transactionSenderService.getTransactionFields(this.selectedType).subscribe(
      data => {
        this.inputFields = data;
        this.formInputs = [data];
        this.walletsInputs = [1];
      },
      error => this.error = error
    );
    this.getSellerWallet();
  }

  addInputRow() {
    this.formInputs.push(JSON.parse(JSON.stringify(this.inputFields)));
    this.walletsInputs.push(1);
  }

  removeInputRow(index) {
    this.formInputs.splice(index, 1);
    this.walletsInputs.splice(index, 1);
  }

  getTransactionTypes() {
    this.transactionSenderService.getTransactionTypes().subscribe(
      response => {
        this.transactionTypes = response;
        this.selectedType = response[0].type_name;
        this.walletsInputs = [1];
        this.getSellerWallet();
        this.changeFields();
      },
      error => this.error = error
    );
  }

  getSellerWallet() {
    this.transactionSenderService.getSellerWallet(this.selectedType).subscribe(
      data => {
        if (data.length > 0) {
          this.sellerWallet = data[0].wallet_address;
        } else {
          this.sellerWallet = '';
        }
      },
      error => this.error = error
    )
  }

  // send data from input fields
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
      wallets_inputs: this.walletsInputs
    };
    console.log('Sending data');
    this.transactionSenderService.sendForm(this.selectedType, data).subscribe(
      response => {
        alert(response.message);
        console.log(response);
      },
      error => {
        alert(error);
      }
    );
  }

  /*
    boolean function - checks if all form fields are filled
    returns:
      true - if form is valid
      false - if form is not valid - all fields are not filled
    throws:
      alert - which field is not filled
  */
  isValidBeforeSend() {
    if (this.selectedType === 'ETH') {
      alert('Not supported!');
      return false;
    }
    if (this.sellerWallet === undefined || this.sellerWallet === null || this.sellerWallet === '') {
      alert('Non existing wallet in selected currency!');
      return false;
    }
    if (this.price === undefined || this.price === null || this.price <= 0 || this.price === '') {
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
    this.walletsInputs.forEach((input, index) => {
      if (input === undefined || input === null || input <= 0 || input === '') {
        inputs.push(index + 1);
      }
    });
    if (inputs.length > 0) {
      alert('Fill inputs on rows: ' + inputs + '!');
      return false;
    }
    return true;
  }
}
