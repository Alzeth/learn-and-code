import { Component, Input } from '@angular/core';
import { Item } from '@components/lessons/item/item';
import { ILesson } from 'app/interfaces';

@Component({
  selector: 'app-lessons-list',
  imports: [Item],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class LessonsList {
  @Input({ required: true }) lessons: ILesson[] = [];
}
