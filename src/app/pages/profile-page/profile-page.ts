import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerService } from 'app/services/logger';
import { IUser } from 'app/interfaces';
import { ZardAvatarComponent } from 'app/shared/components/avatar';

@Component({
  selector: 'app-profile-page',
  imports: [
    ZardAvatarComponent,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private readonly route = inject(ActivatedRoute);
  private logger = inject(LoggerService);

  user = signal<IUser | undefined>(undefined);

  ngOnInit(): void {
    const data = this.route.snapshot.data['profile'];

    this.user.set(data);
    this.logger.info('ProfilePage loaded', this.user());
  }
}
