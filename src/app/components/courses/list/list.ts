import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Item } from 'app/components/courses/item/item';
import { ICourse } from 'app/interfaces';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [Item],
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesList {
  readonly courses = input<ICourse[]>();
}
