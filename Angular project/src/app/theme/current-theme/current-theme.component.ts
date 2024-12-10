import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from '../../user/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../types/user';
@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
  theme = {} as Theme;
  workoutArray: { exercise: string; sets: string }[] = [];
  // isOwner = false; // Initialize as false
  isEditMode = false;
  selectedWorkoutIndex: number | null = null; // Track which workout is being edited

  workoutForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router // Add Router here
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];
  
    console.log('Logged-in User from UserService:', this.userService.user); // Log user details
    
    this.apiService.getSingleTheme(id).subscribe(
      (theme) => {
        this.theme = theme;
  
        console.log('Fetched theme:', this.theme); // Log the full theme object to check userId._id
        
        if (this.theme.workout && Array.isArray(this.theme.workout)) {
          this.workoutArray = this.theme.workout;
        }
  
        console.log('Logged-in user ID:', this.userService.user?.id);  // Use `id` instead of `_id`
        console.log('Theme owner ID:', this.theme.userId);  // Theme owner's ID
        // if(this.theme.userId === this.userService.user?._id){
        //   this.isOwner
        // }
        // // Compare user IDs to set isOwner flag
       
        // console.log('Is Owner:', this.isOwner);  // Should log true/false based on ownership
  
        // this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching theme:', error);
      }
    );
  }
  
  
  
  
  
  


  goBack(): void {
    this.router.navigate(['/themes']);
  }


  toggleEditMode(index: number) {
    // Toggle edit mode for specific workout
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
    this.workoutArray[index] = updatedWorkout; // Update the workout in the array

    const themeId = this.theme._id;
    this.apiService.updateThemeWorkout(themeId, this.workoutArray).subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme; // Update theme with updated workout
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
      this.workoutArray.splice(index, 1); // Remove workout from the array
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
