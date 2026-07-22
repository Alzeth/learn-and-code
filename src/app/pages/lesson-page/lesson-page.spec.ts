import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { ILesson, ILessonProgress } from 'app/interfaces';
import { LessonResolved } from 'app/resolvers/lesson.resolver';
import { UserProgressService } from 'app/services/user-progress';

import { LessonPage } from './lesson-page';

const mockLesson: ILesson = {
  id: 'l1',
  title: 'Intro to Python',
  href: 'intro',
  description: '',
  date: '2024-01-01',
  datetime: '2024-01-01T00:00:00Z',
  icon: '',
  theoryMd: '',
};

const mockResolved: LessonResolved = {
  lesson: mockLesson,
  theory: '# Hello',
  prevLesson: 'prev',
  nextLesson: 'next',
  lessonProgress: { lessonId: 'l1', completed: false, completedAt: null },
};

function buildRoute(resolved: LessonResolved = mockResolved, courseId: string | null = 'c1') {
  return {
    data: of({ lesson: resolved }),
    queryParamMap: of({ get: (key: string) => (key === 'course' ? courseId : null) }),
    snapshot: { paramMap: { get: vi.fn(() => 'intro') } },
  };
}

describe('LessonPage', () => {
  const mockProgress = { markLessonCompleted: vi.fn() };
  const mockTransloco = { translate: vi.fn(() => '# starter code') };

  function setup(resolved = mockResolved, courseId: string | null = 'c1') {
    TestBed.configureTestingModule({
      imports: [LessonPage],
      providers: [
        { provide: ActivatedRoute, useValue: buildRoute(resolved, courseId) },
        { provide: UserProgressService, useValue: mockProgress },
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    }).overrideComponent(LessonPage, { set: { template: '', imports: [] } });
    return TestBed.createComponent(LessonPage);
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
    const component = fixture.componentInstance;
    expect(component.lesson()).toBeUndefined();
    expect(component.theory()).toBe('');
    expect(component.isCompleted()).toBe(false);
  });

  it('ngOnInit() should set lesson, theory, prevLesson, nextLesson from route data', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    const component = fixture.componentInstance;

    expect(component.lesson()).toEqual(mockLesson);
    expect(component.theory()).toBe('# Hello');
    expect(component.prevLesson()).toBe('prev');
    expect(component.nextLesson()).toBe('next');
  });

  it('ngOnInit() should set courseId from query params', () => {
    const fixture = setup(mockResolved, 'c1');
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.courseId()).toBe('c1');
  });

  it('ngOnInit() should set courseId to null when absent', () => {
    const fixture = setup(mockResolved, null);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.courseId()).toBeNull();
  });

  it('ngOnInit() should set isCompleted from lessonProgress', () => {
    const resolved = {
      ...mockResolved,
      lessonProgress: {
        lessonId: 'l1',
        completed: true,
        completedAt: '2024-01-01',
      } as ILessonProgress,
    };
    const fixture = setup(resolved);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.isCompleted()).toBe(true);
  });

  it('ngOnInit() should set isCompleted to false when lessonProgress is null', () => {
    const resolved = { ...mockResolved, lessonProgress: null };
    const fixture = setup(resolved);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.isCompleted()).toBe(false);
  });

  it('markComplete() should do nothing when already completed', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.isCompleted.set(true);

    fixture.componentInstance.markComplete();

    expect(mockProgress.markLessonCompleted).not.toHaveBeenCalled();
  });

  it('markComplete() should do nothing when already marking complete', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.isMarkingComplete.set(true);

    fixture.componentInstance.markComplete();

    expect(mockProgress.markLessonCompleted).not.toHaveBeenCalled();
  });

  it('markComplete() should update isCompleted on success', () => {
    mockProgress.markLessonCompleted.mockReturnValue(
      of({ lessonId: 'l1', completed: true, completedAt: '2024-01-01' }),
    );
    const fixture = setup();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.markComplete();

    expect(fixture.componentInstance.isCompleted()).toBe(true);
    expect(fixture.componentInstance.isMarkingComplete()).toBe(false);
  });

  it('markComplete() should stop isMarkingComplete on error', () => {
    mockProgress.markLessonCompleted.mockReturnValue(throwError(() => new Error()));
    const fixture = setup();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.markComplete();

    expect(fixture.componentInstance.isMarkingComplete()).toBe(false);
    expect(fixture.componentInstance.isCompleted()).toBe(false);
  });

  it('ngOnDestroy() should unsubscribe', () => {
    const fixture = setup();
    fixture.componentInstance.ngOnInit();
    const unsubSpy = vi.spyOn(fixture.componentInstance['subscription'], 'unsubscribe');

    fixture.componentInstance.ngOnDestroy();

    expect(unsubSpy).toHaveBeenCalled();
  });
});
