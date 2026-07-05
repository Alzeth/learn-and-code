import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { ILesson } from '@app/interfaces';
import { LessonsService } from '@app/services/lessons';
import { UserProgressService } from '@app/services/user-progress.service';

export interface LessonsResolved {
  lessons: ILesson[];
  completedIds: Set<string>;
}

@Injectable({
  providedIn: 'root'
})
export class LessonsResolver implements Resolve<LessonsResolved> {
  private lessonsService = inject(LessonsService);
  private progressService = inject(UserProgressService);

  resolve(): Observable<LessonsResolved> {
    return forkJoin({
      lessonsResponse: this.lessonsService.getAll(),
      progress: this.progressService.getUserProgress().pipe(catchError(() => of(null))),
    }).pipe(
      map(({ lessonsResponse, progress }) => ({
        lessons: lessonsResponse.lessons,
        completedIds: new Set(
          (progress?.lessons ?? []).filter(l => l.completed).map(l => l.lessonId)
        ),
      }))
    );
  }
}
