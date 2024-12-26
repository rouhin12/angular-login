import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../http-service/http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('Interceptor: User:', user); // Log the user for debugging
    let authReq = req;

    if (user && user.token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(authReq);
  }
}
