import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsPage } from './lessons-page';

describe('LessonsPage', () => {
  let component: LessonsPage;
  let fixture: ComponentFixture<LessonsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsPage]
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
