import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';

import { LanguageSwitcher } from './language-switcher';

describe('LanguageSwitcher', () => {
  const mockTransloco = {
    getActiveLang: vi.fn().mockReturnValue('en'),
    langChanges$: of('en'),
    setActiveLang: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    mockTransloco.getActiveLang.mockReturnValue('en');
    mockTransloco.langChanges$ = of('en');

    await TestBed.configureTestingModule({
      imports: [LanguageSwitcher],
      providers: [
        { provide: TranslocoService, useValue: mockTransloco },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    })
      .overrideComponent(LanguageSwitcher, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LanguageSwitcher);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize isOpen to false', () => {
    const fixture = TestBed.createComponent(LanguageSwitcher);
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('should toggle isOpen on toggle()', () => {
    const fixture = TestBed.createComponent(LanguageSwitcher);
    const event = new MouseEvent('click');
    vi.spyOn(event, 'stopPropagation');

    fixture.componentInstance.toggle(event);
    expect(fixture.componentInstance.isOpen()).toBe(true);

    fixture.componentInstance.toggle(event);
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('should close on onDocumentClick()', () => {
    const fixture = TestBed.createComponent(LanguageSwitcher);
    const event = new MouseEvent('click');
    fixture.componentInstance.toggle(event);
    expect(fixture.componentInstance.isOpen()).toBe(true);

    fixture.componentInstance.onDocumentClick();
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('should call setActiveLang and close on selectLang()', () => {
    const storeSpy = vi.spyOn(Storage.prototype, 'setItem');
    const fixture = TestBed.createComponent(LanguageSwitcher);
    const openEvent = new MouseEvent('click');
    fixture.componentInstance.toggle(openEvent);

    const event = new MouseEvent('click');
    fixture.componentInstance.selectLang('uk', event);

    expect(mockTransloco.setActiveLang).toHaveBeenCalledWith('uk');
    expect(fixture.componentInstance.isOpen()).toBe(false);
    storeSpy.mockRestore();
  });

  it('should reflect active language from TranslocoService', () => {
    const fixture = TestBed.createComponent(LanguageSwitcher);
    expect(fixture.componentInstance.activeLang()).toBe('en');
  });
});
