import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-exercises',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  exercises: string[] = [];
  series: string[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.exercises.push('');
      this.series.push('');
    }
  }
}
