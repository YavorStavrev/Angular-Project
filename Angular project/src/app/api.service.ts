import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Theme } from './types/theme';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts(limit?: number) {
    let url = `/api/posts`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url);
  }

  getThemes() {
    return this.http.get<Theme[]>(`/api/themes`);
  }

  getSingleTheme(id: string) {
    return this.http.get<Theme>(`/api/themes/${id}`);
  }

  createTheme(themeName: string, postText: string, workout: { exercise: string, sets: string }[]) {
    const payload = { themeName, postText, workout };
    return this.http.post<Theme>('/api/themes', payload);
  }
  

  // CRUD operations
  // update -> http.put
  // updateTheme(themeId: string, themeName: string, postText: string) {
  //   const payload = { themeName, postText };
  //   return this.http.put<Theme>(`/api/themes/${themeId}`, payload);
  // }

// In your ApiService

updateThemeWorkout(themeId: string, updatedWorkout: { exercise: string; sets: string }[]) {
  const payload = { workout: updatedWorkout };
  return this.http.put<Theme>(`/api/themes/${themeId}/workout`, payload);
}

  

  updatePost(themeId: string, postId: string) {
    const payload = {};
    return this.http.put<Theme>(
      `/api/themes/${themeId}/posts/${postId}`,
      payload
    );
  }

//   // delete -> http.delete theme ID
//   deleteTheme(themeId: string) {
//     return this.http.delete(`/api/${themeId}`);
//   }

  
  
}
