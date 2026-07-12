import { TestBed } from '@angular/core/testing';

import { AboutPage } from './about-page';

describe('AboutPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AboutPage] })
      .overrideComponent(AboutPage, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
