import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { CoursesService } from 'app/services/courses';
import { ICoursesResponse } from 'app/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<ICoursesResponse> {
  private coursesService: CoursesService = inject(CoursesService);

  resolve(): Observable<ICoursesResponse> {
    return this.coursesService.getAll();
  }
}
