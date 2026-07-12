import { TestBed } from '@angular/core/testing';

import { ZardAlertDialogService } from 'app/shared/components/alert-dialog/alert-dialog.service';

import { ConfirmationService } from './confirmation.service';

describe('ConfirmationService', () => {
  let service: ConfirmationService;
  let dialogConfirmSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dialogConfirmSpy = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        ConfirmationService,
        { provide: ZardAlertDialogService, useValue: { confirm: dialogConfirmSpy } },
      ],
    });
    service = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('confirm() should resolve true when zOnOk is called', async () => {
    dialogConfirmSpy.mockImplementation(({ zOnOk }: { zOnOk: () => void }) => zOnOk());

    const result = await service.confirm({ title: 'Delete?', description: 'This is permanent.' });
    expect(result).toBe(true);
  });

  it('confirm() should resolve false when zOnCancel is called', async () => {
    dialogConfirmSpy.mockImplementation(({ zOnCancel }: { zOnCancel: () => void }) => zOnCancel());

    const result = await service.confirm({ title: 'Delete?', description: 'This is permanent.' });
    expect(result).toBe(false);
  });

  it('confirm() should resolve false on Escape keydown', async () => {
    dialogConfirmSpy.mockImplementation(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    const result = await service.confirm({ title: 'Delete?', description: 'Irreversible.' });
    expect(result).toBe(false);
  });

  it('confirm() should not resolve twice when settled multiple times', async () => {
    let capturedOk: (() => void) | undefined;
    dialogConfirmSpy.mockImplementation(({ zOnOk }: { zOnOk: () => void }) => {
      capturedOk = zOnOk;
      zOnOk();
    });

    const result = await service.confirm({ title: 'T', description: 'D' });
    capturedOk!();

    expect(result).toBe(true);
  });

  it('should pass confirmText and cancelText to dialog', () => {
    dialogConfirmSpy.mockImplementation(({ zOnCancel }: { zOnCancel: () => void }) => zOnCancel());

    service.confirm({
      title: 'T',
      description: 'D',
      confirmText: 'Yes',
      cancelText: 'No',
      destructive: true,
    });

    expect(dialogConfirmSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        zOkText: 'Yes',
        zCancelText: 'No',
        zOkDestructive: true,
      }),
    );
  });

  it('should use default confirm/cancel text when not provided', () => {
    dialogConfirmSpy.mockImplementation(({ zOnCancel }: { zOnCancel: () => void }) => zOnCancel());

    service.confirm({ title: 'T', description: 'D' });

    expect(dialogConfirmSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        zOkText: 'Confirm',
        zCancelText: 'Cancel',
        zOkDestructive: false,
      }),
    );
  });
});
