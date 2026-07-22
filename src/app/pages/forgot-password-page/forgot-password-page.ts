import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { ROUTES } from 'app/constants';
import { HasUnsavedChanges } from 'app/guards';
import { AuthService } from 'app/services/auth';
import { ZardButtonComponent } from 'app/shared/components/button';
import {
  ZardFormControlComponent,
  ZardFormFieldComponent,
  ZardFormLabelComponent,
  ZardFormMessageComponent,
} from 'app/shared/components/form';
import { ZardInputDirective } from 'app/shared/components/input';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ZardButtonComponent,
    ZardFormFieldComponent,
    ZardFormControlComponent,
    ZardFormMessageComponent,
    ZardFormLabelComponent,
    ZardInputDirective,
    TranslocoPipe,
  ],
  templateUrl: './forgot-password-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage implements HasUnsavedChanges {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private readonly transloco = inject(TranslocoService);

  readonly ROUTES = ROUTES;
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly submitted = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  hasUnsavedChanges(): boolean {
    return this.form.dirty && !this.isLoading();
  }

  submit(): void {
    if (this.form.invalid || this.isLoading()) return;

    const { email } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);

    this.auth.forgotPassword(email!).subscribe({
      next: () => {
        this.submitted.set(true);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(this.transloco.translate('pages.forgotPassword.error'));
        this.isLoading.set(false);
      },
    });
  }
}
