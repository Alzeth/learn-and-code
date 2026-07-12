import { TestBed } from '@angular/core/testing';

import { ILesson } from 'app/interfaces';

import { LessonsList } from './list';

const mockLessons: ILesson[] = [
  {
    id: 'l1',
    title: 'Lesson 1',
    href: '/lessons/l1',
    description: 'First',
    date: '2024-01-01',
    datetime: '2024-01-01T00:00:00Z',
    icon: 'icon',
    theoryMd: '',
  },
  {
    id: 'l2',
    title: 'Lesson 2',
    href: '/lessons/l2',
    description: 'Second',
    date: '2024-01-02',
    datetime: '2024-01-02T00:00:00Z',
    icon: 'icon',
    theoryMd: '',
  },
];

describe('LessonsList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsList],
    })
      .overrideComponent(LessonsList, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LessonsList);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default lessons to undefined', () => {
    const fixture = TestBed.createComponent(LessonsList);
    expect(fixture.componentInstance.lessons()).toBeUndefined();
  });

  it('should default completedIds to empty Set', () => {
    const fixture = TestBed.createComponent(LessonsList);
    expect(fixture.componentInstance.completedIds()).toEqual(new Set());
  });

  it('should reflect lessons input', () => {
    const fixture = TestBed.createComponent(LessonsList);
    fixture.componentRef.setInput('lessons', mockLessons);

    expect(fixture.componentInstance.lessons()).toEqual(mockLessons);
  });

  it('should reflect completedIds input', () => {
    const fixture = TestBed.createComponent(LessonsList);
    const ids = new Set(['l1', 'l2']);
    fixture.componentRef.setInput('completedIds', ids);

    expect(fixture.componentInstance.completedIds()).toEqual(ids);
  });
});
