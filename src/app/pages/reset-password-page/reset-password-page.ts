import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ROUTES } from 'app/constants';
import { AuthService } from 'app/services/auth.service';
import { ZardButtonComponent } from 'app/shared/components/button';
import {
  ZardFormControlComponent,
  ZardFormFieldComponent,
  ZardFormLabelComponent,
  ZardFormMessageComponent,
} from 'app/shared/components/form';
import { ZardInputDirective } from 'app/shared/components/input';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-reset-password-page',
  imports: [ReactiveFormsModule, RouterLink, ZardButtonComponent, ZardFormFieldComponent, ZardFormControlComponent, ZardFormMessageComponent, ZardFormLabelComponent, ZardInputDirective],
  templateUrl: './reset-password-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  private token: string | null = this.route.snapshot.queryParamMap.get('token');

  readonly ROUTES = ROUTES;
  readonly invalidLink = signal(!this.token);
  readonly isLoading = signal(false);
  readonly success = signal(false);
  readonly error = signal<string | null>(null);

  form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  submit(): void {
    if (this.form.invalid || this.isLoading() || !this.token) return;

    const { newPassword } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);

    this.auth.resetPassword(this.token, newPassword!).subscribe({
      next: () => {
        this.router.navigate([], { queryParams: {}, replaceUrl: true });
        this.success.set(true);
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate([ROUTES.AUTH.LOGIN]), 2000);
      },
      error: (err: HttpErrorResponse) => {
        const message = err.status === 400
          ? 'This reset link has expired or has already been used. Please request a new one.'
          : 'Something went wrong. Please try again.';
        this.error.set(message);
        this.isLoading.set(false);
      },
    });
  }
}
