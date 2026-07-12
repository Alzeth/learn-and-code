import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/interfaces';
import { LoggerService } from 'app/services/logger/logger';

import { CoursesPage } from './courses-page';

const mockCourses: ICourse[] = [
  { id: 'c1', title: 'Python Basics', description: '', tableOfContents: [] },
  { id: 'c2', title: 'Advanced Python', description: '', tableOfContents: [] },
];

describe('CoursesPage', () => {
  const mockLogger = { debug: vi.fn(), info: vi.fn() };

  function setup(routeData: unknown) {
    const routeMock = { snapshot: { data: { courses: routeData } } };
    TestBed.configureTestingModule({
      imports: [CoursesPage],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).overrideComponent(CoursesPage, { set: { template: '', imports: [] } });
    return TestBed.createComponent(CoursesPage);
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = setup({ courses: mockCourses });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('courses signal should be undefined before ngOnInit', () => {
    const fixture = setup({ courses: mockCourses });
    expect(fixture.componentInstance.courses()).toBeUndefined();
  });

  it('ngOnInit() should set courses from route data', () => {
    const fixture = setup({ courses: mockCourses });
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.courses()).toEqual(mockCourses);
  });

  it('ngOnInit() should set courses to undefined when route data has no courses key', () => {
    const fixture = setup(undefined);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.courses()).toBeUndefined();
  });
});
