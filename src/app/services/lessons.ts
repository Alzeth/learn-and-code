import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ILesson } from 'app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private http: HttpClient = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http
      .get(`${environment.baseHref}lessons.json`);
  }

  getByHref(href: string): Observable<ILesson | undefined> {
    return this.getAll().pipe(
      map(response => response.lessons.find((l: ILesson) => l.href === href))
    );
  }

  getLessonTheory(href: string): Observable<string> {
    return this.http.get(
      `${environment.baseHref}theory/${href}.md`,
      { responseType: 'text', headers: { 'Accept-Charset': 'utf-8' } }
    ).pipe(
      map(text => new TextDecoder('utf-8').decode(
        new TextEncoder().encode(text)
      ))
    );
  }
}
