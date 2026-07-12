import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  const mockRouter = { navigate: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [{ provide: Router, useValue: mockRouter }],
    })
      .overrideComponent(NotFoundPage, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NotFoundPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('goHome() should navigate to root', () => {
    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.componentInstance.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
