import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ICourse } from 'app/interfaces';

import { Item } from './item';

const mockCourse: ICourse = {
  id: 'course-1',
  title: 'Python Basics',
  description: 'Learn Python from scratch',
  tableOfContents: [],
};

describe('Item (courses)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Item],
      providers: [provideRouter([])],
    })
      .overrideComponent(Item, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Item);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default course to undefined', () => {
    const fixture = TestBed.createComponent(Item);
    expect(fixture.componentInstance.course()).toBeUndefined();
  });

  it('should reflect course input', () => {
    const fixture = TestBed.createComponent(Item);
    fixture.componentRef.setInput('course', mockCourse);

    expect(fixture.componentInstance.course()).toEqual(mockCourse);
  });
});
