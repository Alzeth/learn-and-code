import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { ROUTES } from 'app/constants';
import { AuthService } from 'app/services/auth/auth.service';

import { ResetPasswordPage } from './reset-password-page';

function buildRoute(token: string | null) {
  return {
    snapshot: {
      queryParamMap: { get: (key: string) => (key === 'token' ? token : null) },
    },
  };
}

describe('ResetPasswordPage', () => {
  const mockAuth = { resetPassword: vi.fn() };
  const mockRouter = { navigate: vi.fn() };
  const mockTransloco = { translate: vi.fn((k: string) => k) };

  function setup(token: string | null = 'valid-token') {
    TestBed.configureTestingModule({
      imports: [ResetPasswordPage],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: buildRoute(token) },
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    }).overrideComponent(ResetPasswordPage, { set: { template: '', imports: [] } });
    return TestBed.createComponent(ResetPasswordPage);
  }

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    TestBed.resetTestingModule();
  });

  afterEach(() => vi.useRealTimers());

  it('should create', () => {
    const fixture = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set invalidLink to false when a token is present in query params', () => {
    const fixture = setup('abc123');
    expect(fixture.componentInstance.invalidLink()).toBe(false);
  });

  it('should set invalidLink to true when no token is in query params', () => {
    const fixture = setup(null);
    expect(fixture.componentInstance.invalidLink()).toBe(true);
  });

  it('should initialize other signals to defaults', () => {
    const { componentInstance: c } = setup();
    expect(c.isLoading()).toBe(false);
    expect(c.success()).toBe(false);
    expect(c.error()).toBeNull();
    expect(c.isExpiredError()).toBe(false);
  });

  it('form should be invalid when empty', () => {
    const fixture = setup();
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('form should be invalid when passwords do not match', () => {
    const fixture = setup();
    fixture.componentInstance.form.setValue({
      newPassword: 'password123',
      confirmPassword: 'different1',
    });
    expect(fixture.componentInstance.form.invalid).toBe(true);
    expect(fixture.componentInstance.form.errors?.['mismatch']).toBe(true);
  });

  it('form should be valid when passwords match and meet length requirement', () => {
    const fixture = setup();
    fixture.componentInstance.form.setValue({
      newPassword: 'password123',
      confirmPassword: 'password123',
    });
    expect(fixture.componentInstance.form.valid).toBe(true);
  });

  it('submit() should do nothing when form is invalid', () => {
    const fixture = setup();
    fixture.componentInstance.submit();
    expect(mockAuth.resetPassword).not.toHaveBeenCalled();
  });

  it('submit() should do nothing when token is missing', () => {
    const fixture = setup(null);
    fixture.componentInstance.form.setValue({
      newPassword: 'password123',
      confirmPassword: 'password123',
    });
    fixture.componentInstance.submit();
    expect(mockAuth.resetPassword).not.toHaveBeenCalled();
  });

  it('submit() should set success and navigate to login after 2s on success', () => {
    mockAuth.resetPassword.mockReturnValue(of({}));
    mockRouter.navigate.mockReturnValue(Promise.resolve(true));
    const fixture = setup('abc123');
    fixture.componentInstance.form.setValue({
      newPassword: 'password123',
      confirmPassword: 'password123',
    });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.success()).toBe(true);
    expect(fixture.componentInstance.isLoading()).toBe(false);

    vi.advanceTimersByTime(2000);
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTES.AUTH.LOGIN]);
  });

  it('submit() should set isExpiredError and error on 400 response', () => {
    mockAuth.resetPassword.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 400 })),
    );
    mockTransloco.translate.mockReturnValue('Link expired');
    const fixture = setup('abc123');
    fixture.componentInstance.form.setValue({
      newPassword: 'password123',
      confirmPassword: 'password123',
    });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.isExpiredError()).toBe(true);
    expect(fixture.componentInstance.error()).toBe('Link expired');
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('submit() should set error without isExpiredError on non-400 failure', () => {
    mockAuth.resetPassword.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500 })),
    );
    mockTransloco.translate.mockReturnValue('Something went wrong');
    const fixture = setup('abc123');
    fixture.componentInstance.form.setValue({
      newPassword: 'password123',
      confirmPassword: 'password123',
    });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.isExpiredError()).toBe(false);
    expect(fixture.componentInstance.error()).toBe('Something went wrong');
  });
});
