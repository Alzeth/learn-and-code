import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { LessonsService } from '@app/services/lessons';
import { ILesson } from 'app/interfaces';

export interface LessonResolved {
  lesson: ILesson | undefined;
  theory: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonResolver implements Resolve<LessonResolved> {
  private readonly lessonsService = inject(LessonsService);

  resolve(route: ActivatedRouteSnapshot): Observable<LessonResolved> {
    const href = route.paramMap.get('id')!;

    return forkJoin({
      lesson: this.lessonsService.getByHref(href),
      theory: this.lessonsService.getLessonTheory(href)
    });
  }
}
