import { TestBed } from '@angular/core/testing';

import { DISPLAY_MS, EXIT_MS } from 'app/services/constants';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty toast list', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('should add a toast with defaults on show()', () => {
    service.show({ title: 'Hello', message: 'World' });

    const toasts = service.toasts();
    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toMatchObject({
      title: 'Hello',
      message: 'World',
      type: 'default',
      dismissing: false,
    });
  });

  it('should respect explicit type on show()', () => {
    service.show({ title: 'Danger', message: 'Oops', type: 'destructive' });
    expect(service.toasts()[0].type).toBe('destructive');
  });

  it('should assign incrementing ids to consecutive toasts', () => {
    service.show({ title: 'A', message: '' });
    service.show({ title: 'B', message: '' });

    const [first, second] = service.toasts();
    expect(second.id).toBeGreaterThan(first.id);
  });

  it('should set dismissing=true after DISPLAY_MS', () => {
    service.show({ title: 'T', message: '' });
    const id = service.toasts()[0].id;

    vi.advanceTimersByTime(DISPLAY_MS);
    expect(service.toasts().find((toast) => toast.id === id)?.dismissing).toBe(true);
  });

  it('should remove the toast after DISPLAY_MS + EXIT_MS', () => {
    service.show({ title: 'T', message: '' });
    const id = service.toasts()[0].id;

    vi.advanceTimersByTime(DISPLAY_MS + EXIT_MS);
    expect(service.toasts().find((toast) => toast.id === id)).toBeUndefined();
  });

  it('should mark toast dismissing immediately on dismiss()', () => {
    service.show({ title: 'T', message: '' });
    const id = service.toasts()[0].id;

    service.dismiss(id);
    expect(service.toasts().find((toast) => toast.id === id)?.dismissing).toBe(true);
  });

  it('should remove toast after EXIT_MS following dismiss()', () => {
    service.show({ title: 'T', message: '' });
    const id = service.toasts()[0].id;

    service.dismiss(id);
    vi.advanceTimersByTime(EXIT_MS);
    expect(service.toasts().find((toast) => toast.id === id)).toBeUndefined();
  });

  it('should not affect other toasts when one is dismissed', () => {
    service.show({ title: 'A', message: '' });
    service.show({ title: 'B', message: '' });
    const [first, second] = service.toasts();

    service.dismiss(first.id);
    vi.advanceTimersByTime(EXIT_MS);

    expect(service.toasts()).toHaveLength(1);
    expect(service.toasts()[0].id).toBe(second.id);
  });
});
