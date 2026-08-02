import { LogLevel } from 'app/services/log-level';

export const environment = {
  baseHref: '/',
  production: false,
  logLevel: LogLevel.DEBUG,
  apiUrl: 'https://learn-and-code-be-sepia.vercel.app',
  useLocalData: false,
  geoApiKey: '97b076030f60488a96171f67790e2380',
  geoApiUrl: 'https://api.geoapify.com/v1/ipinfo',
};
