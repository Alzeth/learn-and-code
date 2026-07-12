import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLock } from '@ng-icons/lucide';

import { ToastService } from 'app/services/toast/toast.service';
import { ZardAlertComponent } from 'app/shared/components/alert/alert.component';

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
