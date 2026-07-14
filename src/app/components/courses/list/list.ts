import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Item } from 'app/components/courses/item/item';
import { ICourse } from 'app/interfaces';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [Item, TranslocoPipe],
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesList {
  readonly courses = input<ICourse[]>();
}
