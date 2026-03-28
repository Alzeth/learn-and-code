interface Monaco {
  monaco: typeof import('monaco-editor');
}

declare global {
  interface Window extends Monaco {}
}

export {};
