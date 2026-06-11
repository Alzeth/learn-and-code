import { LogLevel } from 'app/services/log-level';

export const environment = {
  baseHref: '/learn-and-code/',
  production: true,
  logLevel: LogLevel.OFF,
  apiUrl: 'https://learn-and-code-be-sepia.vercel.app',
  useLocalData: false,
};
