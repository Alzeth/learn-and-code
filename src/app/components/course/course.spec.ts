import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ICourse } from 'app/interfaces';

import { Course } from './course';

const mockCourse: ICourse = {
  id: 'course-1',
  title: 'Python Basics',
  description: 'Learn Python from scratch',
  tableOfContents: [
    { id: 'l1', title: 'Lesson 1', description: 'Intro', prevLesson: '', nextLesson: 'l2' },
  ],
};

describe('Course', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Course],
      providers: [provideRouter([])],
    })
      .overrideComponent(Course, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create with required course input', () => {
    const fixture = TestBed.createComponent(Course);
    fixture.componentRef.setInput('course', mockCourse);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should reflect the course input', () => {
    const fixture = TestBed.createComponent(Course);
    fixture.componentRef.setInput('course', mockCourse);

    expect(fixture.componentInstance.course()).toEqual(mockCourse);
  });

  it('should accept undefined as course value', () => {
    const fixture = TestBed.createComponent(Course);
    fixture.componentRef.setInput('course', undefined);

    expect(fixture.componentInstance.course()).toBeUndefined();
  });
});
