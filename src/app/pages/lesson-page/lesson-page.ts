import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { MarkdownParcer } from 'app/components/markdown-parcer/markdown-parcer';
import { MarkdownEmpty } from 'app/components/markdown-empty/markdown-empty';
import { UserProgressService } from 'app/services/user-progress.service';
import { CodeEditor } from 'app/components/code-editor/code-editor';
import { ZardBadgeComponent } from 'app/shared/components/badge';
import { LessonResolved } from 'app/resolvers/lesson.resolver';
import { LoggerService } from 'app/services/logger';
import { ILesson } from 'app/interfaces';
import { lucideBadgeCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [
    CodeEditor,
    MarkdownParcer,
    MarkdownEmpty,
    RouterLink,
    ZardBadgeComponent,
    NgIcon,
  ],
  viewProviders: [provideIcons({ lucideBadgeCheck })],
  templateUrl: './lesson-page.html',
  styleUrl: './lesson-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);
  private readonly progressService = inject(UserProgressService);
  private subscription = new Subscription();

  theoryPanel = viewChild<ElementRef<HTMLDivElement>>('theoryPanel');

  lesson = signal<ILesson | undefined>(undefined);
  theory = signal<string | undefined>('');
  prevLesson = signal<string | undefined>(undefined);
  nextLesson = signal<string | undefined>(undefined);
  courseId = signal<string | null>(null);
  isCompleted = signal(false);
  isMarkingComplete = signal(false);

  ngOnInit(): void {
    this.subscription = combineLatest([this.route.data, this.route.queryParamMap]).subscribe(([data, queryParams]) => {
      const resolved = data['lesson'] as LessonResolved;

      this.lesson.set(resolved.lesson);
      this.theory.set(resolved.theory);
      this.prevLesson.set(resolved.prevLesson);
      this.nextLesson.set(resolved.nextLesson);
      this.courseId.set(queryParams.get('course'));
      this.isCompleted.set(resolved.lessonProgress?.completed ?? false);

      const panel = this.theoryPanel();
      if (panel) {
        panel.nativeElement.scrollTop = 0;
      }
    });
  }

  markComplete(): void {
    const href = this.route.snapshot.paramMap.get('id');
    if (!href || this.isCompleted() || this.isMarkingComplete()) return;

    this.isMarkingComplete.set(true);
    this.progressService.markLessonCompleted(href).subscribe({
      next: (progress) => {
        this.isCompleted.set(progress.completed);
        this.isMarkingComplete.set(false);
      },
      error: () => this.isMarkingComplete.set(false),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
