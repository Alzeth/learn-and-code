import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import { ICourse, ICourseProgress } from 'app/interfaces';
import { AuthService } from 'app/services/auth';
import { CoursesService } from 'app/services/courses';
import { UserProgressService } from 'app/services/user-progress';

export interface CourseResolved {
  course: ICourse;
  courseProgress: ICourseProgress | null;
  firstIncompleteLessonId: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CourseResolver implements Resolve<CourseResolved> {
  private readonly courseService = inject(CoursesService);
  private readonly progressService = inject(UserProgressService);
  private readonly authService = inject(AuthService);

  resolve(route: ActivatedRouteSnapshot): Observable<CourseResolved> {
    const href = route.paramMap.get('id')!;

    return forkJoin({
      course: this.courseService.getById(href),
      progress: this.authService.isAuthenticated()
        ? this.progressService.getUserProgress().pipe(catchError(() => of(null)))
        : of(null),
    }).pipe(
      map(({ course, progress }) => {
        const courseProgress =
          progress?.courses.find((courseProgress) => courseProgress.courseId === course.id) ?? null;
        const completedIds = new Set(
          (progress?.lessons ?? [])
            .filter((lessonProgress) => lessonProgress.completed)
            .map((lessonProgress) => lessonProgress.lessonId),
        );
        const firstIncompleteLessonId =
          courseProgress && courseProgress.percentage > 0
            ? (course.tableOfContents.find((courseLesson) => !completedIds.has(courseLesson.id))
                ?.id ?? null)
            : null;

        return { course, courseProgress, firstIncompleteLessonId };
      }),
    );
  }
}
