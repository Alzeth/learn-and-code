import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourse } from 'app/interfaces';
import { API_BASE_URL, USE_LOCAL_DATA } from './api.config';
import { ICoursesResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);
  private useLocal = inject(USE_LOCAL_DATA);

  getAll(): Observable<ICoursesResponse> {
    const url = this.useLocal ? 'courses.json' : `${this.apiUrl}/courses`;
    return this.http.get<ICoursesResponse>(url);
  }

  getById(id: string): Observable<ICourse> {
    if (this.useLocal) {
      return this.getAll().pipe(map(r => r.courses.find(c => c.id === id)!));
    }
    return this.http.get<ICourse>(`${this.apiUrl}/courses/${id}`);
  }
}
