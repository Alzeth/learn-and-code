import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { LessonsEmpty } from 'app/components/lessons/lessons-empty/lessons-empty';
import { LessonsList } from 'app/components/lessons/list/list';
import { ILesson } from 'app/interfaces';
import { LessonsResolved } from 'app/resolvers/lessons.resolver';
import { LoggerService } from 'app/services/logger/logger';

@Component({
  selector: 'app-lessons-page',
  standalone: true,
  templateUrl: './lessons-page.html',
  styleUrl: './lessons-page.css',
  imports: [LessonsList, LessonsEmpty, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsPage implements OnInit {
  readonly lessons = signal<ILesson[] | undefined>(undefined);
  readonly completedIds = signal<Set<string>>(new Set());

  private route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  ngOnInit() {
    const resolved = this.route.snapshot.data['lessons'] as LessonsResolved;
    this.logger.debug('Lessons page response:', resolved);
    this.lessons.set(resolved.lessons);
    this.completedIds.set(resolved.completedIds);
  }
}
