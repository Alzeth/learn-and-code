import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { map } from 'rxjs';

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
export class CoursesPage {
  private route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  readonly courses = toSignal<ICourse[]>(
    this.route.data.pipe(
      map((data) => {
        this.logger.debug('Courses page response:', data['courses']);
        return data['courses']?.courses;
      }),
    ),
  );
}
