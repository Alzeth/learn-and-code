import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { IEnrolledCourse } from './interfaces';

import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import {
  ZardCardActionComponent,
  ZardCardComponent,
  ZardCardFooterComponent,
  ZardCardHeaderComponent,
  ZardCardTitleComponent,
} from '@/shared/components/card';

@Component({
  selector: 'app-continue-your-journey',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoPipe,
    NgOptimizedImage,
    ZardCardComponent,
    ZardCardHeaderComponent,
    ZardCardActionComponent,
    ZardBadgeComponent,
    ZardCardTitleComponent,
    ZardCardFooterComponent,
    ZardButtonComponent,
  ],
  templateUrl: './continue-your-journey.html',
  styleUrl: './continue-your-journey.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinueYourJourney {
  readonly enrolledCourses = input<IEnrolledCourse[]>([]);
}
