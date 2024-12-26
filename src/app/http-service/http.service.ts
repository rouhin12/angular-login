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
  postData(arg0: string, newUser: User) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
  }

  postData<T>(endpoint: string, data: T): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
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
