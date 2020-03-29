import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionHistorySummaryService } from './transaction-history-summary.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-transaction-history-summary',
  templateUrl: './transaction-history-summary.component.html',
  styleUrls: ['./transaction-history-summary.component.sass']
})
export class TransactionHistorySummaryComponent implements OnInit {
  displayedColumns: string[] = ['total_price', 'currency', 'transaction_count'];
  dataSource = new MatTableDataSource<TransactionSummaryRow>();
  error: any;
  selected: string;
  options: string[] = ['successful', 'unsuccessful'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private transactionHistorySummaryService: TransactionHistorySummaryService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<TransactionSummaryRow>(DUMMY);
    this.dataSource.sort = this.sort;
    this.selected = 'successful';
    let data = {sellerID: 1, option: 'successful'};
    this.transactionHistorySummaryService.getTransactionsSummary(data).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<TransactionSummaryRow>(response.data);
        this.dataSource.sort = this.sort;
      },
      error => this.error
    );
  }

  radioChange(event: MatRadioChange) {
    let data = {sellerID: 1, option: event.value};
    this.transactionHistorySummaryService.getTransactionsSummary(data).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<TransactionSummaryRow>(response.data);
        this.dataSource.sort = this.sort;
      },
      error => this.error
    );
  }
}

export interface TransactionSummaryRow {
  total_price: number;
  currency: string;
  transaction_count: number;
}

const DUMMY: TransactionSummaryRow[] = [
 {total_price: 0.123456, currency: 'BTC', transaction_count: 1},
 {total_price: 10.123456, currency: 'LTC', transaction_count: 2}
]