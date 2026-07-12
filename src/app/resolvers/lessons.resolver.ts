import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import { ILesson } from 'app/interfaces';
import { AuthService } from 'app/services/auth.service';
import { LessonsService } from 'app/services/lessons';
import { UserProgressService } from 'app/services/user-progress.service';

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

  resolve(): Observable<LessonsResolved> {
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
