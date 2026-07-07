import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/interfaces';
import { Course } from 'app/components/course/course';
import { LoggerService } from 'app/services/logger';
import { CourseEmpty } from 'app/components/course/course-empty/course-empty';

@Component({
  selector: 'app-course-page',
  standalone: true,
  templateUrl: './course-page.html',
  styleUrl: './course-page.css',
  imports: [
    Course,
    CourseEmpty,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePage {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  course = signal<ICourse | undefined>(undefined);

  ngOnInit(): void {
    const data = this.route.snapshot.data['course'];

    this.course.set(data);
  }
}
