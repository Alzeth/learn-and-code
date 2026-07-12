import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

import { IUser, IUserProgress } from 'app/interfaces';
import { AuthService } from 'app/services/auth.service';
import { UserProgressService } from 'app/services/user-progress.service';

export interface IUserResolved {
  user: IUser;
  userProgress: IUserProgress;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<IUserResolved> {
  private readonly authService = inject(AuthService);
  private readonly progressService = inject(UserProgressService);

  resolve(): Observable<IUserResolved> {
    return forkJoin({
      user: this.authService.me(),
      userProgress: this.progressService.getUserProgress(),
    });
  }
}
