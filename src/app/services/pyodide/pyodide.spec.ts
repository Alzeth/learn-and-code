import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PyodideService } from './pyodide.service';

describe('PyodideService (server)', () => {
  let service: PyodideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PyodideService, { provide: PLATFORM_ID, useValue: 'server' }],
    });
    service = TestBed.inject(PyodideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isReady to false', () => {
    expect(service.isReady()).toBe(false);
  });

  it('should initialize isLoading to false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('load() should be a no-op on the server', async () => {
    await service.load();
    expect(service.isReady()).toBe(false);
    expect(service.isLoading()).toBe(false);
  });

  it('runCode() should throw when pyodide is not ready', async () => {
    await expect(service.runCode('print("hi")')).rejects.toThrow('Pyodide is not ready');
  });
});

describe('PyodideService (browser)', () => {
  let service: PyodideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PyodideService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(PyodideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load() should not start when already ready', async () => {
    service.isReady.set(true);
    const appendSpy = vi.spyOn(document.head, 'appendChild');

    await service.load();

    expect(appendSpy).not.toHaveBeenCalled();
    appendSpy.mockRestore();
  });

  it('load() should not start when already loading', async () => {
    service.isLoading.set(true);
    const appendSpy = vi.spyOn(document.head, 'appendChild');

    await service.load();

    expect(appendSpy).not.toHaveBeenCalled();
    appendSpy.mockRestore();
  });

  it('runCode() should capture stdout and return trimmed result', async () => {
    const mockPyodide = {
      setStdout: vi.fn(({ batched }: { batched: (t: string) => void }) => {
        batched('Hello');
      }),
      setStderr: vi.fn(),
      runPythonAsync: vi.fn().mockResolvedValue(undefined),
    };
    (service as unknown as { pyodide: unknown }).pyodide = mockPyodide;
    service.isReady.set(true);

    const result = await service.runCode('print("Hello")');

    expect(result.stdout).toBe('Hello');
    expect(result.stderr).toBe('');
  });

  it('runCode() should capture stderr on Python exception', async () => {
    const mockPyodide = {
      setStdout: vi.fn(),
      setStderr: vi.fn(({ batched }: { batched: (t: string) => void }) => {
        batched('Traceback error');
      }),
      runPythonAsync: vi.fn().mockRejectedValue(new Error('SyntaxError: invalid syntax')),
    };
    (service as unknown as { pyodide: unknown }).pyodide = mockPyodide;
    service.isReady.set(true);

    const result = await service.runCode('invalid python!!');

    expect(result.stderr).toBe('SyntaxError: invalid syntax');
  });
});
