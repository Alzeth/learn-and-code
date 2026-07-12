import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ILesson } from 'app/interfaces';

import { Item } from './item';

const mockLesson: ILesson = {
  id: 'lesson-1',
  title: 'Introduction to Python',
  href: '/lessons/lesson-1',
  description: 'First lesson',
  date: '2024-01-01',
  datetime: '2024-01-01T00:00:00Z',
  icon: 'lucideBook',
  theoryMd: '# Hello World',
};

describe('Item (lessons)', () => {
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

  it('should default lesson to undefined', () => {
    const fixture = TestBed.createComponent(Item);
    expect(fixture.componentInstance.lesson()).toBeUndefined();
  });

  it('should default completed to false', () => {
    const fixture = TestBed.createComponent(Item);
    expect(fixture.componentInstance.completed()).toBe(false);
  });

  it('should reflect lesson input', () => {
    const fixture = TestBed.createComponent(Item);
    fixture.componentRef.setInput('lesson', mockLesson);

    expect(fixture.componentInstance.lesson()).toEqual(mockLesson);
  });

  it('should reflect completed input', () => {
    const fixture = TestBed.createComponent(Item);
    fixture.componentRef.setInput('completed', true);

    expect(fixture.componentInstance.completed()).toBe(true);
  });
});
