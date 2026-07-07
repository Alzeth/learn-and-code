import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/interfaces';
import { CoursesList } from 'app/components/courses/list/list';
import { LoggerService } from 'app/services/logger';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CoursesList,
  ],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPage {
  courses = signal<ICourse[] | undefined>(undefined);

  private route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  ngOnInit() {
    const response = this.route.snapshot.data["courses"];
    this.logger.debug('Courses page response:', response);
    this.courses.set(response?.courses);
  }
}
