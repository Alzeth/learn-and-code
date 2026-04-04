import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { LessonsPage } from './lessons-page';

describe('LessonsPage', () => {
  const fakeActivatedRoute = {
    snapshot: {data: {lessons: {lessons: []}}}
  } as unknown as ActivatedRoute;

  let component: LessonsPage;
  let fixture: ComponentFixture<LessonsPage>;

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
      imports: [LessonsPage],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LessonsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
