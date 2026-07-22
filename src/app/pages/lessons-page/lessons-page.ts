import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { LessonsEmpty } from 'app/components/lessons/lessons-empty';
import { LessonsList } from 'app/components/lessons/list';
import { LoggerService } from 'app/services/logger';

@Component({
  selector: 'app-lessons-page',
  standalone: true,
  templateUrl: './lessons-page.html',
  styleUrl: './lessons-page.css',
  imports: [LessonsList, LessonsEmpty, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsPage {
  private route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  private readonly routeData = toSignal(this.route.data);

  readonly lessons = computed(() => {
    const data = this.routeData();
    this.logger.debug('Lessons page response:', data);
    return data?.['lessons']?.lessons;
  });
  readonly completedIds = computed(() => this.routeData()?.['lessons']?.completedIds);
}
