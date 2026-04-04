import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ILessonsResponse } from '@app/services/interfaces';
import { LessonsService } from '@app/services/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonsResolver implements Resolve<ILessonsResponse> {
  private lessonsService: LessonsService = inject(LessonsService);

  resolve(): Observable<ILessonsResponse> {
    return this.lessonsService.getAll();
  }
}
