import { Component, input } from '@angular/core';

import { Item } from '@app/components/lessons/item/item';
import { ILesson } from '@app/interfaces';

@Component({
  selector: 'app-lessons-list',
  imports: [Item],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class LessonsList {
  lessons = input<ILesson[]>();
  completedIds = input<Set<string>>(new Set());
}
