import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ILessonProgress } from 'app/interfaces';
import { API_BASE_URL } from 'app/services/api.config';
import { IApiResponse, ILessonProgressResponse, IUserProgressResponse } from 'app/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserProgressService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);

  getUserProgress() {
    return this.http
      .get<IApiResponse<IUserProgressResponse>>(`${this.apiUrl}/progress`)
      .pipe(map(res => res.data!));
  }

  getLessonProgress(href: string) {
    return this.http
      .get<IApiResponse<ILessonProgress>>(`${this.apiUrl}/progress/lessons/${href}`)
      .pipe(map(res => res.data!));
  }

  markLessonCompleted(href: string) {
    return this.http
      .post<IApiResponse<ILessonProgressResponse>>(`${this.apiUrl}/progress/lessons/${href}/complete`, {})
      .pipe(map(res => res.data!));
  }
}
