import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { LessonsService } from '@app/services/lessons';
import { ILesson } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

export interface LessonResolved {
  lesson: ILesson | undefined;
  theory: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonResolver implements Resolve<LessonResolved> {
  private readonly lessonsService = inject(LessonsService);
  private logger = inject(LoggerService);

  resolve(route: ActivatedRouteSnapshot): Observable<LessonResolved> {
    const href = route.paramMap.get('id')!;
    this.logger.debug('Lesson resolver route:', route);

    return forkJoin({
      lesson: this.lessonsService.getByHref(href),
      theory: this.lessonsService.getLessonTheory(href).pipe(
        catchError((err) => {
          this.logger.debug('LessonResolver getLessonTheory error:', err);
          return of('');
        })
      ),
    }).pipe(
      tap(result => this.logger.info('LessonResolver resolved:', result))
    );
  }
}
