import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { ROUTES } from 'app/constants';
import { AuthService } from 'app/services/auth/auth.service';

import { LoginPage } from './login-page';

describe('LoginPage', () => {
  const mockAuth = { login: vi.fn() };
  const mockRouter = { navigate: vi.fn() };
  const mockTransloco = { translate: vi.fn((key: string) => key) };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    })
      .overrideComponent(LoginPage, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize isLoading and error to defaults', () => {
    const fixture = TestBed.createComponent(LoginPage);
    expect(fixture.componentInstance.isLoading()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('form should be invalid when empty', () => {
    const fixture = TestBed.createComponent(LoginPage);
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('form should be valid with correct email and password', () => {
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'password123' });
    expect(fixture.componentInstance.form.valid).toBe(true);
  });

  it('form should be invalid with a short password', () => {
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'short' });
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('hasUnsavedChanges() should return true when form is dirty and not loading', () => {
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.markAsDirty();
    expect(fixture.componentInstance.hasUnsavedChanges()).toBe(true);
  });

  it('hasUnsavedChanges() should return false when loading', () => {
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.markAsDirty();
    fixture.componentInstance.isLoading.set(true);
    expect(fixture.componentInstance.hasUnsavedChanges()).toBe(false);
  });

  it('submit() should do nothing when form is invalid', () => {
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.submit();
    expect(mockAuth.login).not.toHaveBeenCalled();
  });

  it('submit() should navigate to base URL on success', () => {
    mockAuth.login.mockReturnValue(of({}));
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'password123' });

    fixture.componentInstance.submit();

    expect(mockAuth.login).toHaveBeenCalledWith('a@b.com', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTES.BASE_URL]);
  });

  it('submit() should set error and stop loading on failure', () => {
    mockAuth.login.mockReturnValue(
      throwError(() => ({ error: { error: { message: 'Bad creds' } } })),
    );
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'password123' });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.error()).toBe('Bad creds');
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('submit() should fall back to translation when error has no message', () => {
    mockAuth.login.mockReturnValue(throwError(() => ({})));
    mockTransloco.translate.mockReturnValue('Invalid credentials');
    const fixture = TestBed.createComponent(LoginPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'password123' });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.error()).toBe('Invalid credentials');
  });
});
