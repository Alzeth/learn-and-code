import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { AuthService } from 'app/services/auth/auth.service';

import { ForgotPasswordPage } from './forgot-password-page';

describe('ForgotPasswordPage', () => {
  const mockAuth = { forgotPassword: vi.fn() };
  const mockTransloco = { translate: vi.fn((key: string) => key) };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordPage],
      providers: [
        FormBuilder,
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth },
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    })
      .overrideComponent(ForgotPasswordPage, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize signals to defaults', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    const { componentInstance: component } = fixture;
    expect(component.isLoading()).toBe(false);
    expect(component.error()).toBeNull();
    expect(component.submitted()).toBe(false);
  });

  it('form should be invalid when email is empty', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('form should be invalid with a non-email value', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.setValue({ email: 'notanemail' });
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('form should be valid with a valid email', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.setValue({ email: 'user@example.com' });
    expect(fixture.componentInstance.form.valid).toBe(true);
  });

  it('hasUnsavedChanges() should return true when form is dirty and not loading', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.markAsDirty();
    expect(fixture.componentInstance.hasUnsavedChanges()).toBe(true);
  });

  it('hasUnsavedChanges() should return false while loading', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.markAsDirty();
    fixture.componentInstance.isLoading.set(true);
    expect(fixture.componentInstance.hasUnsavedChanges()).toBe(false);
  });

  it('submit() should do nothing when form is invalid', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.submit();
    expect(mockAuth.forgotPassword).not.toHaveBeenCalled();
  });

  it('submit() should set submitted to true on success', () => {
    mockAuth.forgotPassword.mockReturnValue(of({}));
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.setValue({ email: 'user@example.com' });

    fixture.componentInstance.submit();

    expect(mockAuth.forgotPassword).toHaveBeenCalledWith('user@example.com');
    expect(fixture.componentInstance.submitted()).toBe(true);
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('submit() should set error and stop loading on failure', () => {
    mockAuth.forgotPassword.mockReturnValue(throwError(() => new Error()));
    mockTransloco.translate.mockReturnValue('Something went wrong');
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.setValue({ email: 'user@example.com' });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.error()).toBe('Something went wrong');
    expect(fixture.componentInstance.isLoading()).toBe(false);
    expect(fixture.componentInstance.submitted()).toBe(false);
  });

  it('submit() should do nothing when already loading', () => {
    const fixture = TestBed.createComponent(ForgotPasswordPage);
    fixture.componentInstance.form.setValue({ email: 'user@example.com' });
    fixture.componentInstance.isLoading.set(true);

    fixture.componentInstance.submit();

    expect(mockAuth.forgotPassword).not.toHaveBeenCalled();
  });
});
