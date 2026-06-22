import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILesson } from 'app/interfaces';
import { environment } from 'environments/environment';
import { API_BASE_URL, USE_LOCAL_DATA } from './api.config';
import { ILessonsResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);
  private useLocal = inject(USE_LOCAL_DATA);

  getAll(): Observable<ILessonsResponse> {
    const url = this.useLocal
      ? `${environment.baseHref}lessons.json`
      : `${this.apiUrl}/lessons`;
    return this.http.get<ILessonsResponse>(url);
  }

  getByHref(href: string): Observable<ILesson> {
    if (this.useLocal) {
      return this.getAll().pipe(map(r => r.lessons.find(l => l.href === href)!));
    }
    return this.http.get<ILesson>(`${this.apiUrl}/lessons/${href}`);
  }

  getLessonTheory(href: string): Observable<string> {
    const url = this.useLocal
      ? `${environment.baseHref}theory/${href}.md`
      : `${this.apiUrl}/lessons/${href}/theory`;
    return this.http.get(url, { responseType: 'text' });
  }
}
