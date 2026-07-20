import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlay, lucideRotateCcw } from '@ng-icons/lucide';
import { editor } from 'monaco-editor';
import { EditorComponent } from 'ngx-monaco-editor-v2';

import { AppSettings } from 'app/app.settings';
import { LoggerService } from 'app/services/logger/logger';
import { PyodideService } from 'app/services/pyodide/pyodide';
import { ZardButtonComponent } from 'app/shared/components/button';
import { EDarkModes, ZardDarkMode } from 'app/shared/services';
import getEditorTheme from 'app/shared/utils/get-editor-theme';

import { ZardTooltipImports } from '@/shared/components/tooltip';

@Component({
  selector: 'app-code-editor',
  imports: [
    FormsModule,
    EditorComponent,
    ZardButtonComponent,
    TranslocoPipe,
    NgIcon,
    ZardTooltipImports,
  ],
  viewProviders: [provideIcons({ lucidePlay, lucideRotateCcw })],
  standalone: true,
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditor {
  private logger: LoggerService = inject(LoggerService);
  private readonly darkModeService = inject(ZardDarkMode);
  private readonly transloco = inject(TranslocoService);
  private injector = inject(Injector);
  readonly pyodide = inject(PyodideService);

  readonly starterCode = input<string>('function x() {\nconsole.log("Hello world!");\n}');

  options = AppSettings.MONACO_SETTINGS;

  private readonly _code = signal('');
  get code(): string {
    return this._code();
  }
  set code(value: string) {
    this._code.set(value);
  }

  readonly output = signal('');
  readonly hasError = signal(false);
  readonly isRunning = signal(false);

  private monacoEditor?: editor.ICodeEditor;

  constructor() {
    effect(() => {
      this._code.set(this.starterCode());
    });

    this.pyodide.load();
  }

  onInit(editor: editor.ICodeEditor) {
    this.logger.info('Editor instance', editor);
    this.monacoEditor = editor;
    this.setEditorTheme(this.darkModeService.themeMode());

    effect(
      () => {
        const theme = this.darkModeService.themeMode();
        this.setEditorTheme(theme);
      },
      { injector: this.injector },
    );
  }

  async runCode(): Promise<void> {
    if (!this.pyodide.isReady() || this.isRunning()) return;

    this.isRunning.set(true);
    this.output.set('');
    this.hasError.set(false);

    const { stdout, stderr } = await this.pyodide.runCode(this._code());

    if (stderr) {
      this.output.set(stderr);
      this.hasError.set(true);
    } else {
      this.output.set(stdout || this.transloco.translate('codeEditor.noOutput'));
      this.hasError.set(false);
    }

    this.isRunning.set(false);
  }

  resetCode(): void {
    this._code.set(this.starterCode());
    this.output.set('');
    this.hasError.set(false);
  }

  private setEditorTheme(theme: EDarkModes) {
    if (!this.monacoEditor) return;
    const monacoTheme = getEditorTheme(theme);

    window.monaco?.editor?.setTheme(monacoTheme);
  }
}
