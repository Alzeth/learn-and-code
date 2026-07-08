import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLock } from '@ng-icons/lucide';

import { ZardAlertComponent } from 'app/shared/components/alert/alert.component';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ZardAlertComponent],
  providers: [provideIcons({ lucideLock })],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  protected readonly toastService = inject(ToastService);
}
