// Run with --prod flag to generate environment.ts (CI/prod builds)
// Run without flag to generate environment.development.ts (local dev via prestart)
// Local: node --env-file=.env scripts/set-env.js
// CI:    node scripts/set-env.js --prod  (runs automatically via prebuild in CI)
const { writeFileSync } = require('fs');
const { resolve } = require('path');

const isProd = process.argv.includes('--prod');

// When building locally without CI env vars, skip overwriting environment.ts so
// manual edits are preserved. GitHub Actions always sets CI=true.
if (isProd && !process.env['CI'] && !process.env['NG_APP_API_URL'] && !process.env['GEO_API_KEY']) {
  console.log('Skipping environment.ts generation (not in CI and no env vars set). Using existing file.');
  process.exit(0);
}

const apiUrl = JSON.stringify(
  process.env['NG_APP_API_URL'] ??
    (isProd ? 'https://learn-and-code-be-sepia.vercel.app' : 'http://localhost:3000')
);
const useLocalData = process.env['NG_APP_USE_LOCAL_DATA'] === 'true';
const geoApiKey = JSON.stringify(process.env['GEO_API_KEY'] ?? '');
const geoApiUrl = JSON.stringify(process.env['GEO_API_URL'] ?? '');

const prodContent = `import { LogLevel } from 'app/services/log-level';

export const environment = {
  baseHref: '/learn-and-code/',
  production: true,
  logLevel: LogLevel.OFF,
  apiUrl: ${apiUrl},
  useLocalData: ${useLocalData},
  geoApiKey: ${geoApiKey},
  geoApiUrl: ${geoApiUrl},
};
`;

const devContent = `import { LogLevel } from 'app/services/log-level';

export const environment = {
  baseHref: '/',
  production: false,
  logLevel: LogLevel.DEBUG,
  apiUrl: ${apiUrl},
  useLocalData: ${useLocalData},
  geoApiKey: ${geoApiKey},
  geoApiUrl: ${geoApiUrl},
};
`;

const targetFile = isProd ? 'environment.ts' : 'environment.development.ts';

writeFileSync(resolve(__dirname, `../src/environments/${targetFile}`), isProd ? prodContent : devContent);
console.log(`Generated src/environments/${targetFile}`);
