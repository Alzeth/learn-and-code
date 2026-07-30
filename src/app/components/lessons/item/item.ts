import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck } from '@ng-icons/lucide';

import { ILesson } from 'app/interfaces';
import { ZardBadgeComponent } from 'app/shared/components/badge';
import {
  ZardCardComponent,
  ZardCardDescriptionComponent,
  ZardCardHeaderComponent,
  ZardCardTitleComponent,
} from 'app/shared/components/card/card.component';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [
    ZardCardComponent,
    RouterLink,
    NgIcon,
    ZardBadgeComponent,
    TranslocoPipe,
    ZardCardTitleComponent,
    ZardCardHeaderComponent,
    ZardCardDescriptionComponent,
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
