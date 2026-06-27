import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';

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
    RouterLink,
  ],
  templateUrl: './lesson-page.html',
  styleUrl: './lesson-page.css',
})
export class LessonPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);
  private subscription = new Subscription();

  lesson = signal<ILesson | undefined>(undefined);
  theory = signal<string | undefined>('');
  prevLesson = signal<string | undefined>(undefined);
  nextLesson = signal<string | undefined>(undefined);
  courseId = signal<string | null>(null);

  ngOnInit(): void {
    this.subscription = combineLatest([this.route.data, this.route.queryParamMap]).subscribe(([data, queryParams]) => {
      const resolved = data['lesson'] as LessonResolved;

      this.lesson.set(resolved.lesson);
      this.theory.set(resolved.theory);
      this.prevLesson.set(resolved.prevLesson);
      this.nextLesson.set(resolved.nextLesson);
      this.courseId.set(queryParams.get('course'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
