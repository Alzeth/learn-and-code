import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ToastService } from 'app/services/toast';

import { ToastContainerComponent } from './toast-container';

describe('ToastContainerComponent', () => {
  const mockToasts = signal<
    { id: number; title: string; message: string; type: string; dismissing: boolean }[]
  >([]);
  const mockToastService = {
    toasts: mockToasts.asReadonly(),
    show: vi.fn(),
    dismiss: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastContainerComponent],
      providers: [{ provide: ToastService, useValue: mockToastService }],
    })
      .overrideComponent(ToastContainerComponent, { set: { template: '', imports: [] } })
      .compileComponents();

    mockToasts.set([]);
    vi.clearAllMocks();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToastContainerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose toasts from ToastService', () => {
    const fixture = TestBed.createComponent(ToastContainerComponent);
    const toast = { id: 1, title: 'Test', message: 'Hello', type: 'default', dismissing: false };
    mockToasts.set([toast]);

    expect(fixture.componentInstance['toastService'].toasts()).toEqual([toast]);
  });

  it('should reflect empty toasts initially', () => {
    const fixture = TestBed.createComponent(ToastContainerComponent);
    expect(fixture.componentInstance['toastService'].toasts()).toEqual([]);
  });
});
