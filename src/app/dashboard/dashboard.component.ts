import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatCardModule, DatePipe]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: any;

  @ViewChild('lineChart') lineChart!: any;
  @ViewChild('bubbleChart') bubbleChart!: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngAfterViewInit() {
    this.createLineChart();
    this.createBubbleChart();
  }

  createLineChart() {
    const canvas = this.lineChart.nativeElement;
    const ctx1 = canvas.getContext('2d');

    const data1: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [{
          label: 'Line Chart',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          data: [
            { x: 1, y: 2, r: 5 },
            { x: 2500, y: 2.5, r: 10 },
            { x: 3000, y: 5, r: 15 },
            { x: 3400, y: 4.75, r: 20 },
            { x: 3600, y: 4.75, r: 25 },
            { x: 5200, y: 6, r: 30 },
            { x: 6000, y: 9, r: 35 },
            { x: 7100, y: 6, r: 40 },
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Line Chart'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'X Axis'
            }
          }],
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Y Axis'
            }
          }]
        }
      }
    };

    new Chart(ctx1, data1);
  }

  createBubbleChart() {
    const canvas = this.bubbleChart.nativeElement;
    const ctx = canvas.getContext('2d');

    const data: ChartConfiguration = {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Bubble Chart',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          data: [
            { x: 1, y: 2, r: 5 },
            { x: 2500, y: 2.5, r: 10 },
            { x: 3000, y: 5, r: 15 },
            { x: 3400, y: 4.75, r: 20 },
            { x: 3600, y: 4.75, r: 25 },
            { x: 5200, y: 6, r: 30 },
            { x: 6000, y: 9, r: 35 },
            { x: 7100, y: 6, r: 40 },
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Bubble Chart'
        },
        scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'X Axis'
            }
          }],
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Y Axis'
            }
          }]
        }
      }
    };

    new Chart(ctx, data);
  }

  stayOnDashboard() {
    // This method is intentionally left empty to keep the user on the dashboard page
  }
}
