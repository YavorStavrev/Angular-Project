import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  standalone: true
})
export class CatalogComponent implements OnInit{
posts: Post[] = [];

constructor(private apiService: ApiService) {}

ngOnInit(): void {
  this.apiService.getPosts().subscribe(posts => {  
      this.posts = posts;
  });
}
}
