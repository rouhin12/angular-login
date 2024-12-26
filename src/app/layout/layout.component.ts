import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatButtonModule } from '@angular/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { User } from '../http-service/http.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MatToolbarModule, MatCardModule, MatSidenavModule, MatListModule, MatIconModule, CommonModule, RouterOutlet, RouterModule],
  providers: [DatePipe]
})
export class LayoutComponent {
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
