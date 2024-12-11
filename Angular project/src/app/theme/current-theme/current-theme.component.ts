import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from '../../user/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserForAuth } from '../../types/user';
@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
  theme = {} as Theme;
  user: UserForAuth | null = null;

  workoutArray: { exercise: string; sets: string }[] = [];
  isOwner = false;
  isEditMode = false;
  selectedWorkoutIndex: number | null = null;

  workoutForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }


  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(i => {
      this.user = i;

    }
    )
    const id = this.route.snapshot.params['themeId'];



    this.apiService.getSingleTheme(id).subscribe(
      (theme) => {
        this.theme = theme;

        if (this.theme.workout && Array.isArray(this.theme.workout)) {
          this.workoutArray = this.theme.workout;
        }

        if (this.theme.userId === this.user?._id) {
          this.isOwner = true;
        }

      },
      (error) => {
        console.error('Error fetching theme:', error);
      }
    );
  }





  hasLikedPost(): boolean {
    const userId = this.user?._id || '';
    return this.theme.likes.includes(userId);
  }


  handleLikePost(): void {
    if (!this.isLoggedIn || this.isOwner || this.hasLikedPost()) {
      return; 
    }

    const themeId = this.theme._id;
    this.apiService.likeTheme(themeId).subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme; 
        this.toggleLikeButton();  
      },
      (error) => {
        console.error('Error liking the post:', error);
      }
    );
  }

  
  toggleLikeButton(): void {
    
    if (this.hasLikedPost()) {
      document.getElementById('likeButton')?.setAttribute('style', 'display:none');
      document.getElementById('likeStatus')?.setAttribute('style', 'display:inline');
    } else {
      document.getElementById('likeButton')?.setAttribute('style', 'display:inline');
      document.getElementById('likeStatus')?.setAttribute('style', 'display:none');
    }
  }





  goBack(): void {
    this.router.navigate(['/themes']);
  }


  toggleEditMode(index: number) {
    
    this.isEditMode = !this.isEditMode;
    this.selectedWorkoutIndex = index;
    const workout = this.workoutArray[index];
    this.workoutForm = new FormGroup({
      exercise: new FormControl(workout.exercise, Validators.required),
      sets: new FormControl(workout.sets, Validators.required),
    });
  }

  handleSaveWorkout(index: number) {
    if (this.workoutForm.invalid) {
      return;
    }

    const updatedWorkout = this.workoutForm.value;
    this.workoutArray[index] = updatedWorkout; 

    const themeId = this.theme._id;
    this.apiService.updateThemeWorkout(themeId, this.workoutArray).subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme; 
        this.isEditMode = false;
        this.selectedWorkoutIndex = null;
      },
      (error) => {
        console.error('Error updating workout:', error);
      }
    );
  }

  handleDeleteWorkout(index: number) {
    const themeId = this.theme._id;
    if (confirm('Are you sure you want to delete this workout?')) {
      this.workoutArray.splice(index, 1); 
      this.apiService.updateThemeWorkout(themeId, this.workoutArray).subscribe(
        () => {
          console.log('Workout deleted');
        },
        (error) => {
          console.error('Error deleting workout:', error);
        }
      );
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.isEditMode = false;
    this.selectedWorkoutIndex = null;
  }
}
