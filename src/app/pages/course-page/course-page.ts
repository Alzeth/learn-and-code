import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from 'app/components/course/course';
import { CourseEmpty } from 'app/components/course/course-empty/course-empty';
import { ICourse } from 'app/interfaces';
import { LoggerService } from 'app/services/logger/logger';

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

  ngOnInit(): void {
    const data = this.route.snapshot.data['course'];

    this.course.set(data);
    this.logger.debug('Course Page loaded', this.course());
  }
}
