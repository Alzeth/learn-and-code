interface Monaco {
  monaco: typeof import('monaco-editor');
}

interface Pyodide {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadPyodide: (config: { indexURL: string }) => Promise<any>
}

declare global {
  interface Window extends Monaco, Pyodide {}
}

export {};
