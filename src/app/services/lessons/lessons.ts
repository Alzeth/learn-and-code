import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable, shareReplay } from 'rxjs';

import { ILesson } from 'app/interfaces';
import { API_BASE_URL, USE_LOCAL_DATA } from 'app/services/api.config';
import { IApiResponse, ILessonsResponse } from 'app/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);
  private useLocal = inject(USE_LOCAL_DATA);

  private allCache$: Observable<ILessonsResponse> | null = null;
  private theoryCache$: Observable<string> | null = null;

  getAll(): Observable<ILessonsResponse> {
    if (this.allCache$) return this.allCache$;

    const request$ = this.useLocal
      ? this.http.get<ILessonsResponse>(`${environment.baseHref}lessons.json`)
      : this.http
          .get<IApiResponse<ILessonsResponse>>(`${this.apiUrl}/lessons`)
          .pipe(map((res) => res.data!));

    this.allCache$ = request$.pipe(shareReplay(1));
    return this.allCache$;
  }

  invalidateAll(): void {
    this.allCache$ = null;
  }

  getByHref(href: string): Observable<ILesson> {
    if (this.useLocal) {
      return this.getAll().pipe(map((res) => res.lessons.find((lesson) => lesson.href === href)!));
    }

    return this.http
      .get<IApiResponse<ILesson>>(`${this.apiUrl}/lessons/${href}`)
      .pipe(map((res) => res.data!));
  }

  getLessonTheory(href: string): Observable<string> {
    if (this.theoryCache$) return this.theoryCache$;

    const url = this.useLocal
      ? `${environment.baseHref}theory/${href}.md`
      : `${this.apiUrl}/lessons/${href}/theory`;

    const request = this.http.get<IApiResponse<string>>(url).pipe(map((res) => res.data!));

    this.theoryCache$ = request.pipe(shareReplay(1));
    return this.theoryCache$;
  }
}
