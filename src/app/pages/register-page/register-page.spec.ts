import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import { ROUTES } from 'app/constants';
import { AuthService } from 'app/services/auth/auth.service';

import { RegisterPage } from './register-page';

describe('RegisterPage', () => {
  const mockAuth = { register: vi.fn() };
  const mockRouter = { navigate: vi.fn() };
  const mockTransloco = { translate: vi.fn((key: string) => key) };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    })
      .overrideComponent(RegisterPage, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize isLoading and error to defaults', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    expect(fixture.componentInstance.isLoading()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('form should be invalid when empty', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('form should be valid with email and password of minimum length', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'password123' });
    expect(fixture.componentInstance.form.valid).toBe(true);
  });

  it('hasUnsavedChanges() should return true when form is dirty and not loading', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.form.markAsDirty();
    expect(fixture.componentInstance.hasUnsavedChanges()).toBe(true);
  });

  it('hasUnsavedChanges() should return false while loading', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.form.markAsDirty();
    fixture.componentInstance.isLoading.set(true);
    expect(fixture.componentInstance.hasUnsavedChanges()).toBe(false);
  });

  it('submit() should do nothing when form is invalid', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.submit();
    expect(mockAuth.register).not.toHaveBeenCalled();
  });

  it('submit() should navigate to base URL on success', () => {
    mockAuth.register.mockReturnValue(of({}));
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.form.setValue({ email: 'new@user.com', password: 'password123' });

    fixture.componentInstance.submit();

    expect(mockAuth.register).toHaveBeenCalledWith('new@user.com', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTES.BASE_URL]);
  });

  it('submit() should set email-taken error on 409 status', () => {
    mockAuth.register.mockReturnValue(throwError(() => ({ status: 409 })));
    mockTransloco.translate.mockReturnValue('Email already taken');
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.form.setValue({ email: 'taken@user.com', password: 'password123' });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.error()).toBe('Email already taken');
    expect(fixture.componentInstance.isLoading()).toBe(false);
  });

  it('submit() should set generic error on non-409 failure', () => {
    mockAuth.register.mockReturnValue(throwError(() => ({ status: 500 })));
    mockTransloco.translate.mockReturnValue('Registration failed');
    const fixture = TestBed.createComponent(RegisterPage);
    fixture.componentInstance.form.setValue({ email: 'a@b.com', password: 'password123' });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.error()).toBe('Registration failed');
  });
});
