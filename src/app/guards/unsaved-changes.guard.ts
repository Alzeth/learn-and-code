import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { ConfirmationService } from 'app/services/confirmation';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (!component.hasUnsavedChanges()) return true;

  return inject(ConfirmationService).confirm({
    title: 'Unsaved changes',
    description: 'You have unsaved changes. Are you sure you want to leave?',
    confirmText: 'Leave',
    cancelText: 'Stay',
    destructive: true,
  });
};
