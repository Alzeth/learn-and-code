import { Injectable, signal } from '@angular/core';

import { DISPLAY_MS, EXIT_MS } from 'app/services/constants';
import { IToast, IToastOptions } from 'app/services/interfaces';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  private readonly _toasts = signal<IToast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(options: IToastOptions): void {
    const id = ++this.nextId;

    this._toasts.update((list) => [
      ...list,
      {
        id,
        title: options.title,
        message: options.message,
        type: options.type ?? 'default',
        icon: options.icon,
        dismissing: false,
      },
    ]);

    setTimeout(() => this.dismiss(id), DISPLAY_MS);
  }

  dismiss(id: number): void {
    this._toasts.update((list) =>
      list.map((toast) => (toast.id === id ? { ...toast, dismissing: true } : toast)),
    );

    setTimeout(() => {
      this._toasts.update((list) => list.filter((toast) => toast.id !== id));
    }, EXIT_MS);
  }
}
