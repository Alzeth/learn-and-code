import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ROUTES } from '@app/constants';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private http: HttpClient = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http
      .get(`${ROUTES.BASE_URL}/lessons.json`);
  }
}
