import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';

import { ICourse, ICourseProgress } from 'app/interfaces';
import { ZardAccordionComponent } from 'app/shared/components/accordion/accordion.component';
import { ZardAccordionItemComponent } from 'app/shared/components/accordion/accordion-item.component';
import { ZardButtonComponent } from 'app/shared/components/button';
import { ZardProgressBarComponent } from 'app/shared/components/progress-bar';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    RouterLink,
    ZardButtonComponent,
    NgIcon,
    TranslocoPipe,
    ZardProgressBarComponent,
  ],
  viewProviders: [provideIcons({ lucideArrowRight })],
  templateUrl: './course.html',
  styleUrl: './course.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Course {
  readonly course = input.required<ICourse | undefined>();
  readonly courseProgress = input<ICourseProgress | null>(null);
  readonly firstIncompleteLessonId = input<string | null>(null);
}
