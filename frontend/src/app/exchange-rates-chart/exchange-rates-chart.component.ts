import { Component, OnInit } from '@angular/core';
import { ExchangeRatesChartService } from './exchange-rates-chart.service';
import { ExchangeRatesTableService } from '@app/exchange-rates-table/exchange-rates-table.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-exchange-rates-chart',
  templateUrl: './exchange-rates-chart.component.html',
  styleUrls: ['./exchange-rates-chart.component.sass']
})

export class ExchangeRatesChartComponent implements OnInit {
  dataSource: Array<Currencies>;
  selectedDataSource: Array<Currencies>;
  selectedExchangePair;
  exchangePairs: Array<string>;
  error: any;
  view: any[] = [580, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Value in EUR';
  timeline: boolean = true;
  autoScale: boolean = true;

  colorScheme = {
    domain: ['#761efd']
  };

  constructor(private exchangeRatesTableService: ExchangeRatesTableService) {}

  ngOnInit() {
    this.getAssetDetails();
    setInterval(() => this.getAssetDetails(), 4000);
  }

  getAssetDetails() {
    this.exchangeRatesTableService.getAssetDetails().subscribe(
      data => {
        this.appendToDataSource(this.transform(data));
        // push available currencies into exchangePairs array
        if (this.exchangePairs === null || this.exchangePairs === undefined) {
          this.exchangePairs = [];
          for (var i = 0; i < this.dataSource.length; i++) {
            this.exchangePairs.push(this.dataSource[i].name);
          }
          // set first exchange pair as selected by default
          this.selectedDataSource = [this.dataSource[0]];
          this.selectedExchangePair = this.selectedDataSource[0].name;
        }
      },
      error => this.error
    );
  }

  transform(response) {
    var datetime = new Date();
    var result = response.data.map(x => {
      return {
        name: x.pair.slice(0, 3),
        series: [{
          name: datetime.toLocaleTimeString(),
          value: x.ask
        }]
      };
    });
    return result;
  }

  appendToDataSource(data: Array<Currencies>) {
    if (this.dataSource === null || this.dataSource === undefined) {
      this.dataSource = data.slice(0);
    }
    else {
      var maxLength = 0;
      for (var i = 0; i < this.dataSource.length; i++) {
        if (maxLength < this.dataSource[i].series.length) {
          maxLength = this.dataSource[i].series.length;
        }
      }
      if (maxLength >= 20) {
        for (var i = 0; i < this.dataSource.length; i++) {
          this.dataSource[i].series = this.dataSource[i].series.slice(1);
        }
      }
      for (var i = 0; i < this.dataSource.length; i++) {
        this.dataSource[i].series = this.dataSource[i].series.concat(data[i].series);
      }
    }
    this.selectedDataSource = [this.dataSource[this.getIndexByName(this.selectedExchangePair)]];
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  /*
    changeFields - void function
    - method is called when exchange pair is changed
  */
  changeFields() {
    for (var i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].name === this.selectedExchangePair) {
        this.selectedDataSource = [this.dataSource[i]];
        break;
      }
    }
  }

  getIndexByName(name): number {
    for (var i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].name === name) {
        return i;
      }
    }
    return -1;
  }
}

export interface Currency {
  name: string;
  value: number;
}

export interface Currencies {
  name: string;
  series: Currency[];
}