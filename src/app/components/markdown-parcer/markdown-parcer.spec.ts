import { TestBed } from '@angular/core/testing';

import { MarkdownParcer } from './markdown-parcer';

describe('MarkdownParcer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownParcer],
    })
      .overrideComponent(MarkdownParcer, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MarkdownParcer);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default theory to empty string', () => {
    const fixture = TestBed.createComponent(MarkdownParcer);
    expect(fixture.componentInstance.theory()).toBe('');
  });

  it('should reflect theory input', () => {
    const fixture = TestBed.createComponent(MarkdownParcer);
    fixture.componentRef.setInput('theory', '# Hello');

    expect(fixture.componentInstance.theory()).toBe('# Hello');
  });

  it('should accept undefined theory', () => {
    const fixture = TestBed.createComponent(MarkdownParcer);
    fixture.componentRef.setInput('theory', undefined);

    expect(fixture.componentInstance.theory()).toBeUndefined();
  });
});
