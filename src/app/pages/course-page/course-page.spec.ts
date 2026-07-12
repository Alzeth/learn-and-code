import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'app/interfaces';
import { LoggerService } from 'app/services/logger/logger';

import { CoursePage } from './course-page';

const mockCourse: ICourse = {
  id: 'c1',
  title: 'Python Basics',
  description: 'Intro to Python',
  tableOfContents: [],
};

describe('CoursePage', () => {
  const mockLogger = { debug: vi.fn(), info: vi.fn() };

  function setup(courseData: ICourse | undefined) {
    const routeMock = { snapshot: { data: { course: courseData } } };
    TestBed.configureTestingModule({
      imports: [CoursePage],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).overrideComponent(CoursePage, { set: { template: '', imports: [] } });
    const fixture = TestBed.createComponent(CoursePage);
    return fixture;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = setup(mockCourse);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('course signal should be undefined before ngOnInit', () => {
    const fixture = setup(mockCourse);
    expect(fixture.componentInstance.course()).toBeUndefined();
  });

  it('ngOnInit() should set course from route data', () => {
    const fixture = setup(mockCourse);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.course()).toEqual(mockCourse);
  });

  it('ngOnInit() should set course to undefined when route data is missing', () => {
    const fixture = setup(undefined);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.course()).toBeUndefined();
  });
});
