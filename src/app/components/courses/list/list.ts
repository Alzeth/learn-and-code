import { Component, input, Input } from '@angular/core';

import { Item } from '@app/components/courses/item/item';
import { ICourse } from '@app/interfaces';

@Component({
  selector: 'app-courses-list',
  imports: [Item],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class CoursesList {
  courses = input<ICourse[]>();
}
