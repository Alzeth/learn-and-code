import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CourseEmpty } from './course-empty';

describe('CourseEmpty', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEmpty],
      providers: [provideRouter([])],
    })
      .overrideComponent(CourseEmpty, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CourseEmpty);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
