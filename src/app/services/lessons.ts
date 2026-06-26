import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILesson } from 'app/interfaces';
import { environment } from 'environments/environment';
import { API_BASE_URL, USE_LOCAL_DATA } from './api.config';
import { IApiResponse, ILessonsResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);
  private useLocal = inject(USE_LOCAL_DATA);

  getAll(): Observable<ILessonsResponse> {
    if (this.useLocal) {
      return this.http.get<ILessonsResponse>(`${environment.baseHref}lessons.json`);
    }

    return this.http.get<IApiResponse<ILessonsResponse>>(`${this.apiUrl}/lessons`).pipe(map(r => r.data!));
  }

  getByHref(href: string): Observable<ILesson> {
    if (this.useLocal) {
      return this.getAll().pipe(map(r => r.lessons.find(l => l.href === href)!));
    }

    return this.http.get<IApiResponse<ILesson>>(`${this.apiUrl}/lessons/${href}`).pipe(map(r => r.data!));
  }

  getLessonTheory(href: string): Observable<string> {
    const url = this.useLocal
      ? `${environment.baseHref}theory/${href}.md`
      : `${this.apiUrl}/lessons/${href}/theory`;

    return this.http.get<IApiResponse<string>>(url).pipe(map(r => r.data!));
  }
}
