import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCard, MatCardModule, MatCardTitle } from '@angular/material/card';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatCardModule, DatePipe]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: any;

  canvas: any;
  ctx: any;
  @ViewChild('mychart ') mychart!: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    let data: any =  {
      type: 'line',
      
      data: {
        datasets: [{
          label: 'Höhenlinie',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2500, y: 2.5 },
            { x: 3000, y: 5 },
            { x: 3400, y: 4.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 6 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Höhenlinie'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              userCallback: function (tick: any) {
                if (tick >= 1000) {
                  return (tick / 1000).toString() + 'km';
                }
                return tick.toString() + 'm';
              }
            },
            scaleLabel: {
              labelString: 'Länge',
              display: true,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick: any) {
                return tick.toString() + 'm';
              }
            },
            scaleLabel: {
              labelString: 'Höhe',
              display: true
            }
          }]
        }
      }
    }

    let myChart = new Chart(this.ctx, data);


  }

  stayOnDashboard() {
    // This method is intentionally left empty to keep the user on the dashboard page
  }
}
