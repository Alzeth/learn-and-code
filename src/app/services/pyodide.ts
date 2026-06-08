import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface PyodideResult {
  stdout: string;
  stderr: string;
}

@Injectable({ providedIn: 'root' })
export class PyodideService {
  private readonly platformId = inject(PLATFORM_ID);
  private pyodide: any = null;

  readonly isLoading = signal(false);
  readonly isReady = signal(false);

  async load(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isReady() || this.isLoading()) return;

    this.isLoading.set(true);

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/pyodide/pyodide.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide'));
      document.head.appendChild(script);
    });

    this.pyodide = await window.loadPyodide({ indexURL: '/pyodide/' });

    this.isLoading.set(false);
    this.isReady.set(true);
  }

  async runCode(code: string): Promise<PyodideResult> {
    if (!this.isReady()) throw new Error('Pyodide is not ready');

    let stdout = '';
    let stderr = '';

    this.pyodide.setStdout({ batched: (text: string) => { stdout += text + '\n'; } });
    this.pyodide.setStderr({ batched: (text: string) => { stderr += text + '\n'; } });

    try {
      await this.pyodide.runPythonAsync(code);
    } catch (err: any) {
      stderr = err.message;
    }

    return { stdout: stdout.trim(), stderr: stderr.trim() };
  }
}
