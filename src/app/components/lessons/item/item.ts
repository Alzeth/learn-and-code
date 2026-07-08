import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck } from '@ng-icons/lucide';

import { ILesson } from 'app/interfaces';
import { ZardBadgeComponent } from 'app/shared/components/badge';
import { ZardCardComponent } from 'app/shared/components/card';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [
    ZardCardComponent,
    RouterLink,
    NgIcon,
    ZardBadgeComponent,
  ],
  viewProviders: [provideIcons({ lucideBadgeCheck })],
  templateUrl: './item.html',
  styleUrl: './item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Item {
  readonly lesson = input<ILesson>();
  readonly completed = input<boolean>(false);
}
