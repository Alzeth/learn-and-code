import { Component, DestroyRef, effect, inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '@services/logger';
import { EDarkModes, ZardDarkMode } from '@shared/services';
import getEditorTheme from '@shared/utils/get-editor-theme';
import { AppSettings } from 'app/app.settings';
import { editor } from 'monaco-editor';
import { EditorComponent } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  imports: [
    FormsModule,
    EditorComponent
  ],
  standalone: true,
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
})
export class CodeEditor {
  private logger: LoggerService = inject(LoggerService);
  private readonly darkModeService = inject(ZardDarkMode);
  private readonly destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  options = AppSettings.MONACO_SETTINGS;
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  private monacoEditor?: editor.ICodeEditor;

  onInit(editor: editor.ICodeEditor) {
    this.logger.info('Editor instance', editor);
    this.monacoEditor = editor;

    this.setEditorTheme(this.darkModeService.themeMode());

    effect(
      () => {
        const theme = this.darkModeService.themeMode();
        this.setEditorTheme(theme);
      },
      { injector: this.injector }
    );
  }

  private setEditorTheme(theme: EDarkModes) {
    if (!this.monacoEditor) return;
    const monacoTheme = getEditorTheme(theme);

    window.monaco?.editor?.setTheme(monacoTheme);
  }
}
