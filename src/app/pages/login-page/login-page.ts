import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
} from 'app/shared/components/form/form.component';
import { ZardInputDirective } from 'app/shared/components/input';

@Component({
  selector: 'app-login-page',
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
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements HasUnsavedChanges {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private readonly transloco = inject(TranslocoService);

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

    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigate([ROUTES.BASE_URL]),
      error: (err) => {
        this.error.set(
          err?.error?.error?.message ?? this.transloco.translate('pages.login.invalidCredentials'),
        );
        this.isLoading.set(false);
      },
    });
  }
}
