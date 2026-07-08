import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ICourse } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

import { API_BASE_URL, USE_LOCAL_DATA } from './api.config';
import { IApiResponse, ICoursesResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);
  private useLocal = inject(USE_LOCAL_DATA);
  private logger = inject(LoggerService);

  getAll(): Observable<ICoursesResponse> {
    const url = this.useLocal ? 'courses.json' : `${this.apiUrl}/courses`;
    this.logger.debug('API Url', url);

    if (this.useLocal) {
      return this.http.get<ICoursesResponse>(url);
    }

    return this.http.get<IApiResponse<ICoursesResponse>>(url).pipe(map(res => res.data!));
  }

  getById(id: string): Observable<ICourse> {
    if (this.useLocal) {
      return this.getAll().pipe(map(res => res.courses.find(course => course.id === id)!));
    }

    return this.http.get<IApiResponse<ICourse>>(`${this.apiUrl}/courses/${id}`).pipe(map(res => res.data!));
  }
}
