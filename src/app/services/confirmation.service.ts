import { inject, Injectable } from '@angular/core';

import { ZardAlertDialogService } from 'app/shared/components/alert-dialog/alert-dialog.service';

export interface ConfirmOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private readonly dialogService = inject(ZardAlertDialogService);

  confirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let settled = false;

      const settle = (result: boolean) => {
        if (settled) return;
        settled = true;
        document.removeEventListener('keydown', onEscape, true);
        resolve(result);
      };

      const onEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') settle(false);
      };
      document.addEventListener('keydown', onEscape, true);

      this.dialogService.confirm({
        zTitle: options.title,
        zDescription: options.description,
        zOkText: options.confirmText ?? 'Confirm',
        zCancelText: options.cancelText ?? 'Cancel',
        zOkDestructive: options.destructive ?? false,
        zOnOk: () => settle(true),
        zOnCancel: () => settle(false),
      });
    });
  }
}
