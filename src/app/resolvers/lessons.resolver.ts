import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import { ILesson } from 'app/interfaces';
import { AuthService } from 'app/services/auth';
import { LessonsService } from 'app/services/lessons';
import { UserProgressService } from 'app/services/user-progress';

export interface LessonsResolved {
  lessons: ILesson[];
  completedIds: Set<string>;
}

@Injectable({
  providedIn: 'root',
})
export class LessonsResolver implements Resolve<LessonsResolved> {
  private lessonsService = inject(LessonsService);
  private progressService = inject(UserProgressService);
  private authService = inject(AuthService);
  private resolvedLang: string | undefined;

  resolve(route: ActivatedRouteSnapshot): Observable<LessonsResolved> {
    const lang = route.queryParams['lang'];
    if (lang !== this.resolvedLang) {
      this.lessonsService.invalidateAll();
      this.resolvedLang = lang;
    }
    return forkJoin({
      lessonsResponse: this.lessonsService.getAll(),
      progress: this.authService.isAuthenticated()
        ? this.progressService.getUserProgress().pipe(catchError(() => of(null)))
        : of(null),
    }).pipe(
      map(({ lessonsResponse, progress }) => ({
        lessons: lessonsResponse.lessons,
        completedIds: new Set(
          (progress?.lessons ?? [])
            .filter((lesson) => lesson.completed)
            .map((lesson) => lesson.lessonId),
        ),
      })),
    );
  }
}
