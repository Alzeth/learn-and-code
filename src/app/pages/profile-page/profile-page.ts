import { ChangeDetectionStrategy, Component, computed, inject, OnInit,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookSearch, lucideScrollText } from '@ng-icons/lucide';

import { IUser, IUserProgress } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';
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
export class ProfilePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  readonly user = signal<IUser | undefined>(undefined);
  readonly progress = signal<IUserProgress | undefined>(undefined);

  readonly completedCourses = computed(() =>
    this.progress()?.courses?.filter(course => course.percentage === 100).length ?? 0
  );
  readonly totalCourses = computed(() => this.progress()?.courses?.length ?? 0);
  readonly completedLessons = computed(() =>
    this.progress()?.lessons?.filter(lesson => lesson.completed)?.length ?? 0);

  ngOnInit(): void {
    const data = this.route.snapshot.data['profile'];

    this.user.set(data.user);
    this.progress.set(data.userProgress);
    this.logger.info('ProfilePage data', data);
  }
}
