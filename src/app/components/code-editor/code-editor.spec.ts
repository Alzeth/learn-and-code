import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { EMPTY } from 'rxjs';

import { LoggerService } from 'app/services/logger';
import { PyodideService } from 'app/services/pyodide';
import { EDarkModes, ZardDarkMode } from 'app/shared/services';

import { CodeEditor } from './code-editor';

describe('CodeEditor', () => {
  const pyodideIsReady = signal(false);
  const darkThemeMode = signal<EDarkModes.LIGHT | EDarkModes.DARK>(EDarkModes.LIGHT);

  const mockPyodide = {
    isReady: pyodideIsReady,
    isLoading: signal(false),
    load: vi.fn().mockResolvedValue(undefined),
    runCode: vi.fn(),
  };

  const mockDarkMode = {
    toggleTheme: vi.fn(),
    currentTheme: signal(EDarkModes.LIGHT),
    themeMode: darkThemeMode,
  };

  const mockLogger = { info: vi.fn(), debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
  const mockTransloco = {
    translate: vi.fn((key: string) => key),
    langChanges$: EMPTY,
    getActiveLang: () => 'en',
  };

  beforeEach(async () => {
    pyodideIsReady.set(false);
    vi.clearAllMocks();
    mockPyodide.load.mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [CodeEditor],
      providers: [
        { provide: PyodideService, useValue: mockPyodide },
        { provide: ZardDarkMode, useValue: mockDarkMode },
        { provide: LoggerService, useValue: mockLogger },
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    })
      .overrideComponent(CodeEditor, { set: { template: '', imports: [] } })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CodeEditor);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call pyodide.load on construction', () => {
    TestBed.createComponent(CodeEditor);
    expect(mockPyodide.load).toHaveBeenCalled();
  });

  it('should initialize output to empty string', () => {
    const fixture = TestBed.createComponent(CodeEditor);
    expect(fixture.componentInstance.output()).toBe('');
  });

  it('should initialize hasError to false', () => {
    const fixture = TestBed.createComponent(CodeEditor);
    expect(fixture.componentInstance.hasError()).toBe(false);
  });

  it('should initialize isRunning to false', () => {
    const fixture = TestBed.createComponent(CodeEditor);
    expect(fixture.componentInstance.isRunning()).toBe(false);
  });

  it('should set code to starterCode initially', () => {
    const fixture = TestBed.createComponent(CodeEditor);
    fixture.detectChanges();
    expect(fixture.componentInstance.code).toBe('function x() {\nconsole.log("Hello world!");\n}');
  });

  it('should not run when pyodide is not ready', async () => {
    pyodideIsReady.set(false);
    const fixture = TestBed.createComponent(CodeEditor);

    await fixture.componentInstance.runCode();

    expect(mockPyodide.runCode).not.toHaveBeenCalled();
  });

  it('should not run when already running', async () => {
    pyodideIsReady.set(true);
    const fixture = TestBed.createComponent(CodeEditor);
    fixture.componentInstance.isRunning.set(true);

    await fixture.componentInstance.runCode();

    expect(mockPyodide.runCode).not.toHaveBeenCalled();
  });

  it('should set output and clear error on successful run', async () => {
    pyodideIsReady.set(true);
    mockPyodide.runCode.mockResolvedValue({ stdout: 'Hello', stderr: '' });
    const fixture = TestBed.createComponent(CodeEditor);

    await fixture.componentInstance.runCode();

    expect(fixture.componentInstance.output()).toBe('Hello');
    expect(fixture.componentInstance.hasError()).toBe(false);
    expect(fixture.componentInstance.isRunning()).toBe(false);
  });

  it('should set stderr output and hasError on failed run', async () => {
    pyodideIsReady.set(true);
    mockPyodide.runCode.mockResolvedValue({ stdout: '', stderr: 'SyntaxError: invalid syntax' });
    const fixture = TestBed.createComponent(CodeEditor);

    await fixture.componentInstance.runCode();

    expect(fixture.componentInstance.output()).toBe('SyntaxError: invalid syntax');
    expect(fixture.componentInstance.hasError()).toBe(true);
    expect(fixture.componentInstance.isRunning()).toBe(false);
  });

  it('should use translation key for empty stdout output', async () => {
    pyodideIsReady.set(true);
    mockPyodide.runCode.mockResolvedValue({ stdout: '', stderr: '' });
    mockTransloco.translate.mockReturnValue('No output');
    const fixture = TestBed.createComponent(CodeEditor);

    await fixture.componentInstance.runCode();

    expect(fixture.componentInstance.output()).toBe('No output');
    expect(fixture.componentInstance.hasError()).toBe(false);
  });

  it('should reset code to starterCode on resetCode()', () => {
    const fixture = TestBed.createComponent(CodeEditor);
    fixture.detectChanges();

    fixture.componentInstance.code = 'changed code';
    fixture.componentInstance.output.set('some output');
    fixture.componentInstance.hasError.set(true);

    fixture.componentInstance.resetCode();

    expect(fixture.componentInstance.code).toBe('function x() {\nconsole.log("Hello world!");\n}');
    expect(fixture.componentInstance.output()).toBe('');
    expect(fixture.componentInstance.hasError()).toBe(false);
  });
});
