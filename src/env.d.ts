interface ImportMeta {
  readonly env: {
    readonly NG_APP_API_URL?: string;
    readonly NG_APP_USE_LOCAL_DATA?: string;
    readonly [key: string]: string | undefined;
  };
}
