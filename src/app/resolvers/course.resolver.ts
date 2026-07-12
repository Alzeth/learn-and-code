import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ICourse } from 'app/interfaces';
import { CoursesService } from 'app/services/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver implements Resolve<ICourse> {
  private readonly courseService = inject(CoursesService);

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> {
    const href = route.paramMap.get('id')!;

    return this.courseService.getById(href);
  }
}
