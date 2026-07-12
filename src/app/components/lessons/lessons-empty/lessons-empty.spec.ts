import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LessonsEmpty } from './lessons-empty';

describe('LessonsEmpty', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsEmpty],
      providers: [provideRouter([])],
    })
      .overrideComponent(LessonsEmpty, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LessonsEmpty);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
