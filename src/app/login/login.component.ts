import { Component } from '@angular/core';
import { HttpService, User } from '../http-service/http.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, MatButtonModule, MatInputModule, MatCardModule, RouterModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private httpService: HttpService, private router: Router) {}

  login() {
    this.httpService.fetchUsers().subscribe(users => {
      const user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/layout']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
