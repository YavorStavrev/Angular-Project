import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Theme } from '../../types/theme';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css'],
})
export class AddThemeComponent {
  // Initialize workout as an empty array
  workout: { exercise: string; sets: string }[] = [];

  constructor(private apiService: ApiService, private router: Router) {}
  

  // Add an additional exercise/sets input pair
  addExercise() {
    this.workout.push({ exercise: '', sets: '' });
   
  }

  // Remove a workout input pair
  removeExercise(index: number) {
    this.workout.splice(index, 1);
    
  }

  // Submit the form data
  addTheme(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Directly pass the workout array (no need for an additional loop)
    const { themeName, postText } = form.value;
    const workout = this.workout;  // This is already the correct workout array

    console.log('Workout:', workout);

    // Call the API to create the theme
    this.apiService.createTheme(themeName, postText, workout).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}


// export class CreateComponent {

//   workout = [{ exercise: '', sets: '' }]; // Initialize the workout array

//   constructor(private apiService: ApiService, private router: Router) {}

//   addPost(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }

//     const { postName, postText } = form.value;
//     console.log(form.value);
    
//     // Transform workout data
//     const formattedWorkout = {
//       exercise: this.workout.map(entry => entry.exercise),
//       sets: this.workout.map(entry => entry.sets)
//     };

//     // Call the API with the correct data
//     this.apiService.createPost(postName, postText, formattedWorkout).subscribe(() => {
//       this.router.navigate(['/catalog']);
//     });
//   }
// }

