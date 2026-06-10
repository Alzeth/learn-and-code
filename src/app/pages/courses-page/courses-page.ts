import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from '@app/interfaces';
import { CoursesList } from 'app/components/courses/list/list';

@Component({
  selector: 'app-courses-page',
  imports: [
    CoursesList,
  ],
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
