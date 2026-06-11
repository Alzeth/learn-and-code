import { LogLevel } from 'app/services/log-level';

export const environment = {
  baseHref: '/',
  production: false,
  logLevel: LogLevel.DEBUG,
  apiUrl: 'https://learn-and-code-be-sepia.vercel.app',
  useLocalData: false,
};
