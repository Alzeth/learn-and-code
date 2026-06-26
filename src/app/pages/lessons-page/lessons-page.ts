import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LessonsList } from '@app/components/lessons/list/list';
import { ILesson } from '@app/interfaces';
import { LoggerService } from 'app/services/logger';
import { LessonsEmpty } from 'app/components/lessons/lessons-empty/lessons-empty';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.html',
  styleUrl: './lessons-page.css',
  standalone: true,
  imports: [
    LessonsList,
    LessonsEmpty,
  ],
})
export class LessonsPage {
  lessons = signal<ILesson[] | undefined>(undefined);

  private route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  ngOnInit() {
    const response = this.route.snapshot.data["lessons"];
    this.logger.debug('Lessons page response:', response);
    this.lessons.set(response.lessons);
  }
}
