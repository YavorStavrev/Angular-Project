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
  theme = {} as Theme;

  workout: { exercise: string; sets: string }[] = [];

  constructor(private apiService: ApiService, private router: Router) {}
  

  
  addExercise() {
    this.workout.push({ exercise: '', sets: '' });
   
  }


  removeExercise(index: number) {
    this.workout.splice(index, 1);
    
  }


  addTheme(form: NgForm) {
    if (form.invalid) {
      return;
    }


    const { themeName, postText } = form.value;
    this.theme.description = postText;
    const workout = this.workout;  

    console.log('Workout:', workout);


    this.apiService.createTheme(themeName, postText, workout).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}




