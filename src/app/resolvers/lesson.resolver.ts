import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LessonsService } from '@app/services/lessons';
import { CoursesService } from '@app/services/courses';
import { ILesson } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

export interface LessonResolved {
  lesson: ILesson | undefined;
  theory: string;
  prevLesson?: string;
  nextLesson?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonResolver implements Resolve<LessonResolved> {
  private readonly lessonsService = inject(LessonsService);
  private readonly coursesService = inject(CoursesService);
  private logger = inject(LoggerService);

  resolve(route: ActivatedRouteSnapshot): Observable<LessonResolved> {
    const href = route.paramMap.get('id')!;
    const courseId = route.queryParamMap.get('course');

    return forkJoin({
      lesson: this.lessonsService.getByHref(href),
      theory: this.lessonsService.getLessonTheory(href).pipe(
        catchError((err) => {
          this.logger.debug('LessonResolver getLessonTheory error:', err);
          return of('');
        })
      ),
      course: courseId ? this.coursesService.getById(courseId) : of(null),
    }).pipe(
      map(({ lesson, theory, course }) => {
        const entry = course?.tableOfContents.find(t => t.id === lesson?.id);
        return {
          lesson,
          theory,
          prevLesson: entry?.prevLesson || undefined,
          nextLesson: entry?.nextLesson || undefined,
        };
      }),
      tap(result => this.logger.info('LessonResolver resolved:', result))
    );
  }
}
