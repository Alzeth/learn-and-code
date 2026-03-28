import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { LessonPage } from './lesson-page';

describe('LessonPage', () => {
  let component: LessonPage;
  let fixture: ComponentFixture<LessonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonPage],
      providers: [importProvidersFrom(MonacoEditorModule.forRoot())]
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
