import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  dateOfBirth: Date | null;
  age: number | null;
  token: string;
}

export interface WeatherData {
  time: string[];
  temperature_2m: number[];
}

export interface WeatherResponse {
  hourly: WeatherData;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data);
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  fetchWeather(latitude: number, longitude: number): Observable<WeatherResponse> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('hourly', 'temperature_2m');
    const url = 'https://api.open-meteo.com/v1/forecast';
    return this.http.get<WeatherResponse>(url, { params });
  }
}
