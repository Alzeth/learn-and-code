import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'app/interfaces';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<IUser> {
  private readonly authService = inject(AuthService);

  resolve(): Observable<IUser> {
    return this.authService.me();
  }
}
