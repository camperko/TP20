import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TransactionHistoryStatisticsService } from './transaction-history-statistics.service';

/**
 * @title Transaction history statistics chart
 */
@Component({
  selector: 'app-transaction-history-statistics',
  templateUrl: './transaction-history-statistics.component.html',
  styleUrls: ['./transaction-history-statistics.component.sass']
})
export class TransactionHistoryStatisticsComponent implements OnInit {
  error: any;

  constructor(
    private transactionHistoryStatisticsService: TransactionHistoryStatisticsService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.getCountByHour();
  }

  getCountByHour() {
    this.transactionHistoryStatisticsService.getCountByHour(this.cookieService.get('id')).subscribe(
      data => {
        this.chartLabels = [];
        this.chartDatasets = [{ 
            data: [],
            label: 'Number of successful transactions by hour of day'
          }
        ];
        for (var i = 0; i < data.length; i++) {
          this.chartLabels.push(data[i].hour);
          this.chartDatasets[0].data.push(parseInt(data[i].count));
        }
      },
      error => this.error
    );
  }
  
  public chartType: string = 'bar';
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartColors: Array<any> = [{
      backgroundColor: Array(24).fill('rgba(105, 240, 174, 0.2)'),
      borderColor: Array(24).fill('rgba(105, 240, 174, 1)'),
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
