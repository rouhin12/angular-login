import { Component } from '@angular/core';
import { HttpService, User } from '../http-service/http.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, MatButtonModule, MatInputModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, RouterModule]
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  password: string = '';
  dateOfBirth: Date | null = null;
  age: number | null = null;

  constructor(private httpService: HttpService, private router: Router) {}

  register() {
    const newUser: User = { id: 0, username: this.username, password: this.password, name: this.name, dateOfBirth: this.dateOfBirth, age: this.age, token: '' };
    this.httpService.postUser(newUser).subscribe(() => {
      alert('Registration successful');
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Error registering user:', error);
      alert('An error occurred while registering. Please try again later.');
    });
  }
}
