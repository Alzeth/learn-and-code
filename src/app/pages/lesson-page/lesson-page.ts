import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CodeEditor } from '@app/components/code-editor/code-editor';
import { LessonResolved } from '@app/resolvers/lesson.resolver';
import { ILesson } from '@app/interfaces';
import { MarkdownParcer } from '@app/components/markdown-parcer/markdown-parcer';
import { LoggerService } from 'app/services/logger';
import { MarkdownEmpty } from 'app/components/markdown-empty/markdown-empty';

@Component({
  selector: 'app-lesson-page',
  imports: [
    CodeEditor,
    MarkdownParcer,
    MarkdownEmpty,
  ],
  templateUrl: './lesson-page.html',
  styleUrl: './lesson-page.css',
})
export class LessonPage {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  lesson = signal<ILesson | undefined>(undefined);
  theory = signal<string | undefined>('');

  ngOnInit(): void {
    const data = this.route.snapshot.data['lesson'] as LessonResolved;
    this.logger.debug('Lesson page data:', data);
    this.logger.info('Lesson page data:', data);

    this.lesson.set(data.lesson);
    this.theory.set(data.theory);
    this.logger.info('Lesson page lesson:', this.lesson());
    this.logger.info('Lesson page theory:', this.theory());
  }
}
