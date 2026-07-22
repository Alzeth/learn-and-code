import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { UserInfo } from 'app/components/user/user-info';
import { UserLearningProgress } from 'app/components/user/user-learning-progress';
import { IUser, IUserProgress } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [UserInfo, UserLearningProgress, TranslocoPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  readonly user = signal<IUser | undefined>(undefined);
  readonly progress = signal<IUserProgress | undefined>(undefined);

  readonly completedCourses = computed(
    () => this.progress()?.courses?.filter((course) => course.percentage === 100).length ?? 0,
  );
  readonly totalCourses = computed(() => this.progress()?.courses?.length ?? 0);
  readonly completedLessons = computed(
    () => this.progress()?.lessons?.filter((lesson) => lesson.completed)?.length ?? 0,
  );

  ngOnInit(): void {
    const data = this.route.snapshot.data['profile'];

    this.user.set(data.user);
    this.progress.set(data.userProgress);
    this.logger.info('ProfilePage data', data);
  }
}
