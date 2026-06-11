import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Course } from './course';
import { ActivatedRoute } from '@angular/router';

describe('Course', () => {
  const fakeActivatedRoute = {
    snapshot: {data: {courses: {courses: []}}}
  } as unknown as ActivatedRoute;

  let component: Course;
  let fixture: ComponentFixture<Course>;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Course],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Course);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
