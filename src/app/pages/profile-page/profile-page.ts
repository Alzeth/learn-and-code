import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContinueYourJourney, IEnrolledCourse } from 'app/components/user/continue-your-journey';
import { UserInfo } from 'app/components/user/user-info';
import { UserLearningProgress } from 'app/components/user/user-learning-progress';
import { ICourse, IUser, IUserProgress } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [UserInfo, UserLearningProgress, TranslocoPipe, ContinueYourJourney],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  readonly user = signal<IUser | undefined>(undefined);
  readonly progress = signal<IUserProgress | undefined>(undefined);
  readonly courses = signal<ICourse[]>([]);

  readonly completedCourses = computed(
    () => this.progress()?.courses?.filter((course) => course.percentage === 100).length ?? 0,
  );
  readonly totalCourses = computed(() => this.progress()?.courses?.length ?? 0);
  readonly completedLessons = computed(
    () => this.progress()?.lessons?.filter((lesson) => lesson.completed)?.length ?? 0,
  );

  readonly enrolledCourses = computed<IEnrolledCourse[]>(() => {
    const progress = this.progress();
    if (!progress) return [];

    const completedLessonIds = new Set(
      progress.lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.lessonId),
    );

    return progress.courses
      .filter((prog) => prog.percentage > 0 && prog.percentage < 100)
      .map((prog) => {
        const course = this.courses().find((course) => course.id === prog.courseId);
        if (!course) return null;

        const nextLesson =
          course.tableOfContents.find((lesson) => !completedLessonIds.has(lesson.id)) ??
          course.tableOfContents[0];

        return { course, nextLessonId: nextLesson?.id ?? '', percentage: prog.percentage };
      })
      .filter((item): item is IEnrolledCourse => item !== null);
  });

  ngOnInit(): void {
    const data = this.route.snapshot.data['profile'];

    this.user.set(data.user);
    this.progress.set(data.userProgress);
    this.courses.set(data.courses);
    this.logger.info('ProfilePage data', data);
  }
}
