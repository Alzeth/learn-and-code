import { computed, Injectable, signal } from '@angular/core';

import { IEnrolledCourse } from 'app/components/user/continue-your-journey';
import { ICourse, IUser, IUserProgress } from 'app/interfaces';

@Injectable()
export class ProfileStore {
  private readonly _user = signal<IUser | undefined>(undefined);
  private readonly _progress = signal<IUserProgress | undefined>(undefined);
  private readonly _courses = signal<ICourse[]>([]);

  readonly user = this._user.asReadonly();

  readonly completedCourses = computed(
    () => this._progress()?.courses?.filter((course) => course.percentage === 100).length ?? 0,
  );
  readonly totalCourses = computed(() => this._progress()?.courses?.length ?? 0);
  readonly completedLessons = computed(
    () => this._progress()?.lessons?.filter((lesson) => lesson.completed)?.length ?? 0,
  );

  readonly enrolledCourses = computed<IEnrolledCourse[]>(() => {
    const progress = this._progress();
    if (!progress) return [];

    const completedLessonIds = new Set(
      progress.lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.lessonId),
    );

    return progress.courses
      .filter((prog) => prog.percentage > 0 && prog.percentage < 100)
      .map((prog) => {
        const course = this._courses().find((course) => course.id === prog.courseId);
        if (!course) return null;

        const nextLesson =
          course.tableOfContents.find((lesson) => !completedLessonIds.has(lesson.id)) ??
          course.tableOfContents[0];

        return { course, nextLessonId: nextLesson?.id ?? '', percentage: prog.percentage };
      })
      .filter((item): item is IEnrolledCourse => item !== null);
  });

  initialize(
    user: IUser | undefined,
    progress: IUserProgress | undefined,
    courses: ICourse[],
  ): void {
    this._user.set(user);
    this._progress.set(progress);
    this._courses.set(courses);
  }

  updateCourses(courses: ICourse[]): void {
    this._courses.set(courses);
  }
}
