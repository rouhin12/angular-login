import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isLoginOrRegisterRoute = state.url === '/login' || state.url === '/register';

    if (isLoggedIn && isLoginOrRegisterRoute) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (!isLoggedIn && !isLoginOrRegisterRoute) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
