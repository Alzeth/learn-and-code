import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ROUTES } from 'app/constants';
import { HasUnsavedChanges } from 'app/guards/unsaved-changes.guard';
import { AuthService } from 'app/services/auth.service';
import { ZardButtonComponent } from 'app/shared/components/button';
import {
  ZardFormControlComponent,
  ZardFormFieldComponent,
  ZardFormLabelComponent,
  ZardFormMessageComponent,
} from 'app/shared/components/form';
import { ZardInputDirective } from 'app/shared/components/input';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, ZardButtonComponent, ZardFormMessageComponent, ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent, ZardInputDirective],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements HasUnsavedChanges {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  readonly ROUTES = ROUTES;
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  hasUnsavedChanges(): boolean {
    return this.form.dirty && !this.isLoading();
  }

  submit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);

    this.auth.register(email!, password!).subscribe({
      next: () => this.router.navigate([ROUTES.BASE_URL]),
      error: err => {
        const status = err?.status;
        const msg = status === 409
          ? 'This email is already registered.'
          : (err?.error?.error?.message ?? 'Registration failed. Please try again.');
        this.error.set(msg);
        this.isLoading.set(false);
      },
    });
  }
}
