import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ZardButtonComponent } from 'app/shared/components/button';
import { ZardEmptyComponent } from 'app/shared/components/empty';
import { lucideArrowUpRight, lucideFolderCode } from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-empty',
  templateUrl: './course-empty.html',
  styleUrl: './course-empty.css',
  imports: [ZardButtonComponent, ZardEmptyComponent, NgIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideArrowUpRight,
      lucideFolderCode,
    }),
  ],
})
export class CourseEmpty {}
