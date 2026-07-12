import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookSearch, lucideScrollText } from '@ng-icons/lucide';

import { ZardProgressBarComponent } from 'app/shared/components/progress-bar';

@Component({
  selector: 'app-user-learning-progress',
  imports: [NgIcon, ZardProgressBarComponent],
  viewProviders: [provideIcons({ lucideBookSearch, lucideScrollText })],
  templateUrl: './user-learning-progress.html',
  styleUrl: './user-learning-progress.css',
})
export class UserLearningProgress {
  readonly completedCourses = input<number>(0);
  readonly totalCourses = input<number>(0);
  readonly completedLessons = input<number>(0);
}
