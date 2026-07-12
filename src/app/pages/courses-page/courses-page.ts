import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { CoursesList } from 'app/components/courses/list/list';
import { ICourse } from 'app/interfaces';
import { LoggerService } from 'app/services/logger/logger';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CoursesList, TranslocoPipe],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPage implements OnInit {
  readonly courses = signal<ICourse[] | undefined>(undefined);

  private route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  ngOnInit() {
    const response = this.route.snapshot.data['courses'];
    this.logger.debug('Courses page response:', response);
    this.courses.set(response?.courses);
  }
}
