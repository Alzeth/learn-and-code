import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LessonsList } from '@app/components/lessons/list/list';
import { ILesson } from '@app/interfaces';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.html',
  styleUrl: './lessons-page.css',
  standalone: true,
  imports: [
    LessonsList,
  ]
})
export class LessonsPage {
  lessons: ILesson[] = [];

  private route = inject(ActivatedRoute);

  ngOnInit() {
    const response = this.route.snapshot.data["lessons"];
    this.lessons = response.lessons;
  }
}
