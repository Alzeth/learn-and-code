import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

import { ILesson, ILessonProgress } from 'app/interfaces';
import { CoursesService } from 'app/services/courses';
import { LessonsService } from 'app/services/lessons';
import { LoggerService } from 'app/services/logger';
import { UserProgressService } from 'app/services/user-progress';

export interface LessonResolved {
  lesson: ILesson | undefined;
  theory: string;
  prevLesson?: string;
  nextLesson?: string;
  lessonProgress: ILessonProgress | null;
}

@Injectable({
  providedIn: 'root',
})
export class LessonResolver implements Resolve<LessonResolved> {
  private readonly lessonsService = inject(LessonsService);
  private readonly coursesService = inject(CoursesService);
  private readonly progressService = inject(UserProgressService);
  private logger = inject(LoggerService);
  private resolvedLang: string | undefined;

  resolve(route: ActivatedRouteSnapshot): Observable<LessonResolved> {
    const lang = route.queryParams['lang'];
    if (lang !== this.resolvedLang) {
      this.lessonsService.invalidateAll();
      this.resolvedLang = lang;
    }
    const href = route.paramMap.get('id')!;
    const courseId = route.queryParamMap.get('course');

    return forkJoin({
      lesson: this.lessonsService.getByHref(href),
      theory: this.lessonsService.getLessonTheory(href).pipe(
        catchError((err) => {
          this.logger.debug('LessonResolver getLessonTheory error:', err);
          return of('');
        }),
      ),
      course: courseId ? this.coursesService.getById(courseId) : of(null),
      lessonProgress: this.progressService.getLessonProgress(href).pipe(catchError(() => of(null))),
    }).pipe(
      map(({ lesson, theory, course, lessonProgress }) => {
        const entry = course?.tableOfContents.find((item) => item.id === lesson?.id);
        return {
          lesson,
          theory,
          prevLesson: entry?.prevLesson || undefined,
          nextLesson: entry?.nextLesson || undefined,
          lessonProgress,
        };
      }),
      tap((result) => this.logger.debug('LessonResolver resolved:', result)),
    );
  }
}
