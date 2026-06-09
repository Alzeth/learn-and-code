import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CodeEditor } from '@app/components/code-editor/code-editor';
import { LessonResolved } from '@app/resolvers/lesson.resolver';
import { ILesson } from '@app/interfaces';
import { MarkdownParcer } from '@app/components/markdown-parcer/markdown-parcer';

@Component({
  selector: 'app-lesson-page',
  imports: [
    CodeEditor,
    MarkdownParcer,
  ],
  templateUrl: './lesson-page.html',
  styleUrl: './lesson-page.css',
})
export class LessonPage {
  private readonly route = inject(ActivatedRoute);

  lesson = signal<ILesson | undefined>(undefined);
  theory = signal<string>('');

  ngOnInit(): void {
    const data = this.route.snapshot.data['lesson'] as LessonResolved;

    this.lesson.set(data.lesson);
    this.theory.set(data.theory);
  }
}
