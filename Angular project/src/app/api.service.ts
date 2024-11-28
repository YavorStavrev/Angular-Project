import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts() {
    const { apiUrl } = environment;

    let url = `${apiUrl}/posts`
    return this.http.get<Post[]>(url);
  }

  //   return this.http.get<Post[]>(url);
  // }

  // getThemes() {
  //   return this.http.get<Theme[]>(`/api/themes`);
  // }

  // getSingleTheme(id: string) {
  //   return this.http.get<Theme>(`/api/themes/${id}`);
  // }

  // createTheme(themeName: string, postText: string) {
  //   const payload = { themeName, postText };
  //   return this.http.post<Theme>(`/api/themes`, payload);
  // }

  // // CRUD operations
  // // update -> http.put
  // updateTheme(themeId: string, themeName: string, postText: string) {
  //   const payload = { themeName, postText };
  //   return this.http.put<Theme>(`/api/themes/${themeId}`, payload);
  // }

  // updatePost(themeId: string, postId: string) {
  //   const payload = {};
  //   return this.http.put<Theme>(
  //     `/api/themes/${themeId}/posts/${postId}`,
  //     payload
  //   );
  // }

  // // delete -> http.delete theme ID
  // deletePost(themeId: string, postId: string) {
  //   return this.http.delete(`/api/themes/${themeId}/posts/${postId}`);
  // }
}
