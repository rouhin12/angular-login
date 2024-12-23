import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user');
    let authReq = req;
    console.log('user', user);
    if (user) {
      const token = JSON.parse(user).token; // Assuming the user object has a token property
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  return next(authReq);
};
