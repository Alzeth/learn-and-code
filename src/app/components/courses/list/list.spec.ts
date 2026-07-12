import { TestBed } from '@angular/core/testing';

import { ICourse } from 'app/interfaces';

import { CoursesList } from './list';

const mockCourses: ICourse[] = [
  { id: '1', title: 'Course 1', description: 'Desc 1', tableOfContents: [] },
  { id: '2', title: 'Course 2', description: 'Desc 2', tableOfContents: [] },
];

describe('CoursesList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesList],
    })
      .overrideComponent(CoursesList, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CoursesList);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default courses to undefined', () => {
    const fixture = TestBed.createComponent(CoursesList);
    expect(fixture.componentInstance.courses()).toBeUndefined();
  });

  it('should reflect courses input', () => {
    const fixture = TestBed.createComponent(CoursesList);
    fixture.componentRef.setInput('courses', mockCourses);

    expect(fixture.componentInstance.courses()).toEqual(mockCourses);
  });
});
