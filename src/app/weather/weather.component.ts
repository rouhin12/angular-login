import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule,CommonModule]
})
export class WeatherComponent {
  latitude: number | null = null;
  longitude: number | null = null;
  weatherData: any[] = [];

  constructor(private http: HttpClient) {}

  async fetchWeather() {
    if (this.latitude === null || this.longitude === null) {
      alert('Please enter valid latitude and longitude.');
      return;
    }

    const params = {
      latitude: this.latitude,
      longitude: this.longitude,
      hourly: 'temperature_2m'
    };
    const url = 'https://api.open-meteo.com/v1/forecast';

    try {
      const response = await this.http.get<any>(url, { params }).toPromise();
      const hourly = response.hourly;
      const utcOffsetSeconds = response.utc_offset_seconds;
      const weatherData = hourly.time.map((time: string, index: number) => ({
        time: new Date((new Date(time).getTime() + utcOffsetSeconds * 1000)),
        temperature: hourly.temperature_2m[index]
      }));
      this.weatherData = weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('An error occurred while fetching weather data. Please try again later.');
    }
  }
}
