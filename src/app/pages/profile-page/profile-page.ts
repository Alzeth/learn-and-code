import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContinueYourJourney } from 'app/components/user/continue-your-journey';
import { UserInfo } from 'app/components/user/user-info';
import { UserLearningProgress } from 'app/components/user/user-learning-progress';
import { LoggerService } from 'app/services/logger';
import { ProfileStore } from 'app/store/profile.store';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [UserInfo, UserLearningProgress, TranslocoPipe, ContinueYourJourney],
  providers: [ProfileStore],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly logger = inject(LoggerService);
  readonly store = inject(ProfileStore);

  ngOnInit(): void {
    const data = this.route.snapshot.data['profile'];
    this.store.initialize(data.user, data.userProgress, data.courses);
    this.logger.info('ProfilePage data', data);
  }
}
