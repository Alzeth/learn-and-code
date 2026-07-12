import { TestBed } from '@angular/core/testing';

import { UserLearningProgress } from './user-learning-progress';

describe('UserLearningProgress', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLearningProgress],
    })
      .overrideComponent(UserLearningProgress, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default completedCourses to 0', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    expect(fixture.componentInstance.completedCourses()).toBe(0);
  });

  it('should default totalCourses to 0', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    expect(fixture.componentInstance.totalCourses()).toBe(0);
  });

  it('should default completedLessons to 0', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    expect(fixture.componentInstance.completedLessons()).toBe(0);
  });

  it('should reflect completedCourses input', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    fixture.componentRef.setInput('completedCourses', 3);

    expect(fixture.componentInstance.completedCourses()).toBe(3);
  });

  it('should reflect totalCourses input', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    fixture.componentRef.setInput('totalCourses', 10);

    expect(fixture.componentInstance.totalCourses()).toBe(10);
  });

  it('should reflect completedLessons input', () => {
    const fixture = TestBed.createComponent(UserLearningProgress);
    fixture.componentRef.setInput('completedLessons', 42);

    expect(fixture.componentInstance.completedLessons()).toBe(42);
  });
});
