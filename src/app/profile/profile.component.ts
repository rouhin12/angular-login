import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '../http-service/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, MatCardModule]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }
}
