import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from '@app/interfaces';
import { LessonsList } from 'app/components/lessons/list/list';
import { Item } from 'app/components/lessons/item/item';

@Component({
  selector: 'app-courses-page',
  imports: [],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.css',
})
export class CoursesPage {
  courses: ICourse[] = [];

  private route = inject(ActivatedRoute);

  ngOnInit() {
    const response = this.route.snapshot.data["courses"];
    this.courses = response.courses;
  }
}
