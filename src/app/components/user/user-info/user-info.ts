import { Component, input } from '@angular/core';

import { IUser } from 'app/interfaces';
import { ZardAvatarComponent } from 'app/shared/components/avatar';
import { LOGO_NO_TEXT_PATH_PRD } from 'app/shared/constants';

@Component({
  selector: 'app-user-info',
  imports: [
    ZardAvatarComponent,
  ],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  readonly user = input<IUser | undefined>(undefined);
  protected readonly LOGO_NO_TEXT_PATH_PRD = LOGO_NO_TEXT_PATH_PRD;
}
