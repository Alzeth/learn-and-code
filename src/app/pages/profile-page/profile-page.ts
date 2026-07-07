import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookSearch, lucideScrollText } from '@ng-icons/lucide';

import { LoggerService } from 'app/services/logger';
import { IUser, IUserProgress } from 'app/interfaces';
import { ZardAvatarComponent } from 'app/shared/components/avatar';
import { ZardProgressBarComponent } from 'app/shared/components/progress-bar';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ZardAvatarComponent,
    NgIcon,
    ZardProgressBarComponent,
  ],
  viewProviders: [provideIcons({ lucideBookSearch, lucideScrollText })],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  user = signal<IUser | undefined>(undefined);
  progress = signal<IUserProgress | undefined>(undefined);

  completedCourses = computed(() =>
    this.progress()?.courses?.filter(course => course.percentage === 100).length ?? 0
  );
  totalCourses = computed(() => this.progress()?.courses?.length ?? 0);
  completedLessons = computed(() =>
    this.progress()?.lessons?.filter(lesson => lesson.completed)?.length ?? 0);

  ngOnInit(): void {
    const data = this.route.snapshot.data['profile'];

    this.user.set(data.user);
    this.progress.set(data.userProgress);
    this.logger.info('ProfilePage data', data);
  }
}
