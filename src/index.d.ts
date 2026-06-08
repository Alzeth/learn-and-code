interface Monaco {
  monaco: typeof import('monaco-editor');
}

interface Pyodide {
  loadPyodide: (config: { indexURL: string }) => Promise<any>
}

declare global {
  interface Window extends Monaco, Pyodide {}
}

export {};
