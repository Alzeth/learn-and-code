import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MarkdownEmpty } from './markdown-empty';

describe('MarkdownEmpty', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownEmpty],
      providers: [provideRouter([])],
    })
      .overrideComponent(MarkdownEmpty, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MarkdownEmpty);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
