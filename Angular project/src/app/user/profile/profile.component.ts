import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
})
export class ProfileComponent {
// Sample user data, you can modify it to dynamically load from a backend
username: string = 'john_doe';
email: string = 'john_doe@example.com';
}
