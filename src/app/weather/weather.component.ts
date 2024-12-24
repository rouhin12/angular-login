import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule, CommonModule]
})
export class WeatherComponent implements AfterViewInit {
  latitude: number | null = null;
  longitude: number | null = null;
  weatherData: any[] = [];
  @ViewChild('weatherChart') weatherChart!: any;

  constructor(private httpService: HttpService) {}

  ngAfterViewInit() {
    this.createWeatherChart();
  }

  async fetchWeather() {
    if (this.latitude === null || this.longitude === null) {
      alert('Please enter valid latitude and longitude.');
      return;
    }

    try {
      const response = await this.httpService.fetchWeather(this.latitude, this.longitude).toPromise();
      if (!response) {
        throw new Error('No response received from the weather service.');
      }
      const hourly = response.hourly;
      const weatherData = hourly.time.map((time: string, index: number) => ({
        time: new Date(time),
        temperature: hourly.temperature_2m[index]
      }));
      this.weatherData = weatherData;
      this.createWeatherChart();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('An error occurred while fetching weather data. Please try again later.');
    }
  }

  createWeatherChart() {
    const canvas = this.weatherChart.nativeElement;
    const ctx = canvas.getContext('2d');

    const data: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.weatherData.map(data => data.time),
        datasets: [{
          label: 'Temperature (°C)',
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: this.weatherData.map(data => data.temperature)
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Weather Forecast'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour'
            },
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Temperature (°C)'
            }
          }]
        }
      }
    };

    new Chart(ctx, data);
  }
}