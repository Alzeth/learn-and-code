import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourse, IUser, IUserProgress } from 'app/interfaces';
import { AuthService } from 'app/services/auth';
import { CoursesService } from 'app/services/courses';
import { UserProgressService } from 'app/services/user-progress';

export interface IUserResolved {
  user: IUser;
  userProgress: IUserProgress;
  courses: ICourse[];
}

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<IUserResolved> {
  private readonly authService = inject(AuthService);
  private readonly progressService = inject(UserProgressService);
  private readonly coursesService = inject(CoursesService);

  resolve(): Observable<IUserResolved> {
    return forkJoin({
      user: this.authService.me(),
      userProgress: this.progressService.getUserProgress(),
      courses: this.coursesService.getAll().pipe(map((res) => res.courses)),
    });
  }
}
