import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ILesson } from 'app/interfaces';
import { LessonsResolved } from 'app/resolvers/lessons.resolver';
import { LoggerService } from 'app/services/logger/logger';

import { LessonsPage } from './lessons-page';

const mockLesson: ILesson = {
  id: 'l1',
  title: 'Intro',
  href: 'intro',
  description: '',
  date: '2024-01-01',
  datetime: '2024-01-01T00:00:00Z',
  icon: '',
  theoryMd: '',
};

const mockResolved: LessonsResolved = {
  lessons: [mockLesson],
  completedIds: new Set(['l1']),
};

describe('LessonsPage', () => {
  const mockLogger = { debug: vi.fn(), info: vi.fn() };

  function setup(resolved: LessonsResolved = mockResolved) {
    const routeMock = { data: of({ lessons: resolved }) };
    TestBed.configureTestingModule({
      imports: [LessonsPage],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).overrideComponent(LessonsPage, { set: { template: '', imports: [] } });
    return TestBed.createComponent(LessonsPage);
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    const fixture = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set lessons from route data', () => {
    const fixture = setup(mockResolved);
    expect(fixture.componentInstance.lessons()).toEqual([mockLesson]);
  });

  it('should set completedIds from route data', () => {
    const fixture = setup(mockResolved);
    expect(fixture.componentInstance.completedIds()).toEqual(new Set(['l1']));
  });

  it('should set an empty completedIds when none are completed', () => {
    const fixture = setup({ lessons: [mockLesson], completedIds: new Set() });
    expect(fixture.componentInstance.completedIds()).toEqual(new Set());
  });
});
