/*
Exchange rates table
- gets asset details on init, then every 4 minutes
-
*/
import { Component, OnInit } from '@angular/core';
import { ExchangeRatesTableService } from './exchange-rates-table.service';
import { MatTableDataSource } from '@angular/material';

export interface ExchangeRatesRow {
  currency: string;
  price: string;
  change: string;
  high: string;
  low: string;
}

@Component({
  selector: 'app-exchange-rates-table',
  templateUrl: './exchange-rates-table.component.html',
  styleUrls: ['./exchange-rates-table.component.sass']
})
export class ExchangeRatesTableComponent implements OnInit {
  displayedColumns: string[] = ['currency', 'price', 'change', 'high', 'low'];
  dataSource = new MatTableDataSource<ExchangeRatesRow>();
  error: any;

  constructor(private exchangeRatesTableService: ExchangeRatesTableService) { }

  ngOnInit() {
    this.getAssetDetails();
    setInterval(() => this.getAssetDetails(), 4000);
  }

  getAssetDetails() {
    this.exchangeRatesTableService.getAssetDetails().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<ExchangeRatesRow>(data.data);
      },
      error => this.error
    );
  }
}
