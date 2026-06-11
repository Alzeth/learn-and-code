import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourse } from 'app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http: HttpClient = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http
      .get('courses.json');
  }

  getByHref(href: string): Observable<ICourse> {
    return this.getAll().pipe(
      map(response => response.courses.find((l: ICourse) => l.id === href))
    );
  }
}
