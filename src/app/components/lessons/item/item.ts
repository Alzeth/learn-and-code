import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck } from '@ng-icons/lucide';

import { ZardCardComponent } from "app/shared/components/card";
import { ILesson } from 'app/interfaces';
import { ZardBadgeComponent } from 'app/shared/components/badge';

@Component({
  selector: 'app-lesson-item',
  imports: [
    ZardCardComponent,
    RouterLink,
    NgIcon,
    ZardBadgeComponent,
  ],
  viewProviders: [provideIcons({ lucideBadgeCheck })],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  lesson = input<ILesson>();
  completed = input<boolean>(false);
}
