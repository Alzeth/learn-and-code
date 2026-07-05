import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_BASE_URL } from 'app/services/api.config';
import { map } from 'rxjs/operators';
import { IApiResponse, ILessonProgressResponse, IUserProgressResponse } from 'app/services/interfaces';
import { ILessonProgress } from 'app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserProgressService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);

  getUserProgress() {
    return this.http
      .get<IApiResponse<IUserProgressResponse>>(`${this.apiUrl}/progress`)
      .pipe(map(r => r.data!));
  }

  getLessonProgress(href: string) {
    return this.http
      .get<IApiResponse<ILessonProgress>>(`${this.apiUrl}/progress/lessons/${href}`)
      .pipe(map(r => r.data!));
  }

  markLessonCompleted(href: string) {
    return this.http
      .post<IApiResponse<ILessonProgressResponse>>(`${this.apiUrl}/progress/lessons/${href}/complete`, {})
      .pipe(map(r => r.data!));
  }
}
