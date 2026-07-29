import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookSearch, lucideScrollText } from '@ng-icons/lucide';

import { ZardProgressBarComponent } from 'app/shared/components/progress-bar';

@Component({
  selector: 'app-user-learning-progress',
  standalone: true,
  imports: [NgIcon, ZardProgressBarComponent, TranslocoPipe],
  viewProviders: [provideIcons({ lucideBookSearch, lucideScrollText })],
  templateUrl: './user-learning-progress.html',
  styleUrl: './user-learning-progress.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLearningProgress {
  readonly completedCourses = input<number>(0);
  readonly totalCourses = input<number>(0);
  readonly completedLessons = input<number>(0);
}
