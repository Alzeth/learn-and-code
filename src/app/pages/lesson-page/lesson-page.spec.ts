import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { provideMarkdown } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';

import { LessonPage } from './lesson-page';

describe('LessonPage', () => {
  const fakeActivatedRoute = {
    snapshot: {data: {lesson: '', theory: ''}}
  } as unknown as ActivatedRoute;

  let component: LessonPage;
  let fixture: ComponentFixture<LessonPage>;

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
      imports: [LessonPage],
      providers: [
        importProvidersFrom(MonacoEditorModule.forRoot()),
        provideHttpClient(),
        provideMarkdown(),
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
