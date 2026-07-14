import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Item } from 'app/components/lessons/item/item';
import { ILesson } from 'app/interfaces';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [Item, TranslocoPipe],
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsList {
  readonly lessons = input<ILesson[]>();
  readonly completedIds = input<Set<string>>(new Set());
}
