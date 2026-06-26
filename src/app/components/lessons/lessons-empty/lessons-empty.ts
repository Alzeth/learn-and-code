import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ZardButtonComponent } from 'app/shared/components/button';
import { ZardEmptyComponent } from 'app/shared/components/empty';
import { lucideArrowUpRight, lucideFolderCode } from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lessons-empty',
  templateUrl: './lessons-empty.html',
  styleUrl: './lessons-empty.css',
  imports: [ZardButtonComponent, ZardEmptyComponent, NgIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideArrowUpRight,
      lucideFolderCode,
    }),
  ],
})
export class LessonsEmpty {}
