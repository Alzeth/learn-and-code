import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from 'app/components/course';
import { CourseEmpty } from 'app/components/course/course-empty';
import { ICourse, ICourseProgress } from 'app/interfaces';
import { CourseResolved } from 'app/resolvers/course.resolver';
import { LoggerService } from 'app/services/logger';

@Component({
  selector: 'app-course-page',
  standalone: true,
  templateUrl: './course-page.html',
  styleUrl: './course-page.css',
  imports: [Course, CourseEmpty],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  readonly course = signal<ICourse | undefined>(undefined);
  readonly courseProgress = signal<ICourseProgress | null>(null);
  readonly firstIncompleteLessonId = signal<string | null>(null);

  ngOnInit(): void {
    const data = this.route.snapshot.data['course'] as CourseResolved;

    this.course.set(data?.course);
    this.courseProgress.set(data?.courseProgress ?? null);
    this.firstIncompleteLessonId.set(data?.firstIncompleteLessonId ?? null);
    this.logger.debug('Course Page loaded', this.course());
  }
}
