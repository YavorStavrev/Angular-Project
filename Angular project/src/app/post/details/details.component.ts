import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DetailsComponent {
  isOwner: boolean = true;  // Set to true if the user is the owner, false if the user is a guest
  exercises = [
    { name: 'Push-up', series: '3 sets of 15 reps' },
    { name: 'Squats', series: '4 sets of 20 reps' },
    { name: 'Plank', series: '3 sets of 1 min' }
  ];

  deleteExercise(index: number) {
    this.exercises.splice(index, 1); // Deletes exercise at the given index
  }

  likeExercise(exerciseName: string) {
    console.log(`Liked ${exerciseName}`);
    // You can implement your like functionality here
  }
}
