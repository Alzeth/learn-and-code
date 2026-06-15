import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { LessonsService } from '@app/services/lessons';
import { ICourse, ILesson } from 'app/interfaces';
import { CoursesService } from 'app/services/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<ICourse> {
  private readonly courseService = inject(CoursesService);

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> {
    const href = route.paramMap.get('id')!;

    return this.courseService.getById(href);
  }
}
