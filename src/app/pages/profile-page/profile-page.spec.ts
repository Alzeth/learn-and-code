import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { IUser, IUserProgress } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

import { ProfilePage } from './profile-page';

const mockUser: IUser = { id: 'u1', email: 'test@example.com' };
const mockProgress: IUserProgress = {
  lessons: [
    { lessonId: 'l1', completed: true, completedAt: '2024-01-01' },
    { lessonId: 'l2', completed: false, completedAt: null },
  ],
  courses: [
    { courseId: 'c1', totalLessons: 5, completedLessons: 5, percentage: 100 },
    { courseId: 'c2', totalLessons: 3, completedLessons: 1, percentage: 33 },
  ],
};

describe('ProfilePage', () => {
  const mockLogger = { debug: vi.fn(), info: vi.fn() };

  function setup(profileData = { user: mockUser, userProgress: mockProgress }) {
    const routeMock = { snapshot: { data: { profile: profileData } } };
    TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).overrideComponent(ProfilePage, { set: { template: '', imports: [] } });
    return TestBed.createComponent(ProfilePage);
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('signals should have defaults before ngOnInit', () => {
    const fixture = setup();
    expect(fixture.componentInstance.user()).toBeUndefined();
    expect(fixture.componentInstance.progress()).toBeUndefined();
  });

  it('ngOnInit() should set user and progress from route data', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.user()).toEqual(mockUser);
    expect(fixture.componentInstance.progress()).toEqual(mockProgress);
  });

  it('completedCourses should count courses with 100% completion', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.completedCourses()).toBe(1);
  });

  it('totalCourses should count all courses', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.totalCourses()).toBe(2);
  });

  it('completedLessons should count completed lessons', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.completedLessons()).toBe(1);
  });

  it('computed values should return 0 when progress is undefined', () => {
    const fixture = setup({ user: mockUser, userProgress: undefined as unknown as IUserProgress });
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.completedCourses()).toBe(0);
    expect(fixture.componentInstance.totalCourses()).toBe(0);
    expect(fixture.componentInstance.completedLessons()).toBe(0);
  });
});
