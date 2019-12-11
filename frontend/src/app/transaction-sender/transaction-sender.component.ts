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
      },
      error => this.error = error
    );
  }

  addInputRow() {
    this.formInputs.push(JSON.parse(JSON.stringify(this.inputFields)));
  }

  removeInputRow(index) {
    this.formInputs.splice(index, 1);
  }

  getTransactionTypes() {
    this.transactionSenderService.getTransactionTypes().subscribe(
      response => {
        this.transactionTypes = response;
        this.selectedType = response[0].type_name;
        this.changeFields();
      },
      error => this.error = error
    );
  }

  // send data from input fields
  sendForm() {
    // send only fields ID and value
    const data = {inputFields: this.inputFields.map(({trans_type_field_id, value}) => ({trans_type_field_id, value}))};
    this.transactionSenderService.sendForm(data).subscribe(
      response => console.log(response),
      error => this.error
    );
    console.log("SENT");
    console.log(data.inputFields);
  }
}
