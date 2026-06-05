import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPage } from './courses-page';
import { ActivatedRoute } from '@angular/router';

describe('CoursesPage', () => {
  const fakeActivatedRoute = {
    snapshot: {data: {courses: {courses: []}}}
  } as unknown as ActivatedRoute;

  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

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
      imports: [CoursesPage],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
