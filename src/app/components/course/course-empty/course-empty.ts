import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideFolderCode } from '@ng-icons/lucide';

import { ZardButtonComponent } from 'app/shared/components/button';
import { ZardEmptyComponent } from 'app/shared/components/empty';

@Component({
  selector: 'app-course-empty',
  templateUrl: './course-empty.html',
  styleUrl: './course-empty.css',
  imports: [ZardButtonComponent, ZardEmptyComponent, NgIcon, RouterLink, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideArrowUpRight,
      lucideFolderCode,
    }),
  ],
})
export class CourseEmpty {}
