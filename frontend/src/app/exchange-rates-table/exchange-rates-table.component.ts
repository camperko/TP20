/*
  ExchangeRatesTableComponent - gets asset details (exchange rates) on init, then every 4 seconds
  attributes:
    - displayedColumns
    - dataSource
    - error
  methods:
    - ngOnInit
    - getAssetDetails
*/

import { Component, OnInit } from '@angular/core';
import { ExchangeRatesTableService } from './exchange-rates-table.service';
import { MatTableDataSource } from '@angular/material';

export interface ExchangeRatesRow {
  pair: string;
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
    this.dataSource.data = [];
    this.getAssetDetails();
    setInterval(() => this.getAssetDetails(), 4000);
  }

  /*
    getAssetDetails - void function
      - get exchange rates and push new exchange pairs or replace existing exchange pairs in this.dataSource.data to prevent duplicates
  */
  getAssetDetails() {
    this.exchangeRatesTableService.getAssetDetails().subscribe(
      data => {
        for (var i = 0; i < data.data.length; i++) {
          if (this.dataSource.data.filter(function(e) { return e.pair === data.data[i].pair; }).length <= 0) {
            this.dataSource.data.push(data.data[i]);
            this.dataSource.data = [...this.dataSource.data];
          }
          else {
            let index = this.dataSource.data.map(function(e) { return e.pair; }).indexOf(data.data[i].pair);
            this.dataSource.data[index] = data.data[i];
            this.dataSource.data = [...this.dataSource.data];
          }
        }
      },
      error => this.error
    );
  }
}
