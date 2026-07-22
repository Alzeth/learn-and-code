import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let debugSpy: ReturnType<typeof vi.spyOn>;
  let infoSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);

    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    debugSpy.mockRestore();
    infoSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debug() should call console.debug', () => {
    service.debug('test message');
    expect(debugSpy).toHaveBeenCalled();
  });

  it('info() should call console.info', () => {
    service.info('test message');
    expect(infoSpy).toHaveBeenCalled();
  });

  it('warn() should call console.warn with the raw message', () => {
    service.warn('test warning');
    expect(warnSpy).toHaveBeenCalledWith('test warning');
  });

  it('error() should call console.error with the raw message', () => {
    service.error('test error');
    expect(errorSpy).toHaveBeenCalledWith('test error');
  });

  it('debug() should forward additional arguments', () => {
    service.debug('msg', { extra: true });
    expect(debugSpy).toHaveBeenCalledWith(expect.any(String), expect.any(String), { extra: true });
  });

  it('warn() should forward additional arguments', () => {
    service.warn('msg', 42);
    expect(warnSpy).toHaveBeenCalledWith('msg', 42);
  });
});
