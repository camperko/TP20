/*
Exchange rates table
- gets asset details on init, then every 4 minutes
- 
*/
import { Component, OnInit } from '@angular/core';
import { ExchangeRatesTableService } from './exchange-rates-table.service';

@Component({
  selector: 'app-exchange-rates-table',
  templateUrl: './exchange-rates-table.component.html',
  styleUrls: ['./exchange-rates-table.component.sass']
})
export class ExchangeRatesTableComponent implements OnInit {
  error;
  assetDetails: any;

  constructor(private exchangeRatesTableService: ExchangeRatesTableService) { }

  ngOnInit() {
    this.getAssetDetails();
    setInterval(()=> { this.getAssetDetails() }, 240000);
  }

  getAssetDetails() {
    this.exchangeRatesTableService.getAssetDetails().subscribe(
      data => {
        this.assetDetails = data.data;
        console.log("asset details : " + this.assetDetails);
      },
      error => this.error
    );
  }
}
