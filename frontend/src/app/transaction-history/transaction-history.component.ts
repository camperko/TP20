import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionHistoryService } from './transaction-history.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


/**
 * @title Transaction history table
 */
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.sass']
})
export class TransactionHistoryComponent implements OnInit {
  displayedColumns: string[] = ['index', 'sender_price', 'sender_currency', 'receiver_price', 'receiver_currency', 'is_successful'];
  dataSource = new MatTableDataSource<TransactionRow>();
  error: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private transactionHistoryService: TransactionHistoryService) { }

  ngOnInit() {
    let data = {sellerID: 1};
    this.transactionHistoryService.getTransactions(data).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<TransactionRow>(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => this.error
    );
  }
}

export interface TransactionRow {
  sender_price: number;
  sender_currency: string;
  receiver_price: number;
  receiver_currency: string;
  is_successful: boolean;
}