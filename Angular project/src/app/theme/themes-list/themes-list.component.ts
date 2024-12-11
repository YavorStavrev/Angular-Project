import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';

import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';


@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, ElapsedTimePipe],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css',
})
export class ThemesListComponent implements OnInit {
  themes: Theme[] = [];
  isLoading = true;
  

 
  
  constructor(private apiService: ApiService) {}

 ngOnInit() {
  this.apiService.getThemes().subscribe((themes) => {
    this.themes = themes;
    this.isLoading = false;


    this.themes.forEach(theme => {
      theme.likesCount = theme.likes.length;  
    });
  });
}


  deleteTheme(themeId: string) {
    if (confirm('Are you sure you want to delete this theme?')) {
      this.apiService.deleteTheme(themeId).subscribe(() => {
        this.themes = this.themes.filter(theme => theme._id !== themeId);
      });
    }
  }
}

