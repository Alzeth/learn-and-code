import { EDarkModes } from 'app/shared/services';
import { AppSettings } from 'app/app.settings';

export const getEditorTheme = (inputTheme: EDarkModes) => {
  const resolveTheme = (theme: 'dark' | 'light') =>
    theme === 'dark' ? AppSettings.EDITOR_THEME.DARK : AppSettings.EDITOR_THEME.LIGHT;

  if (inputTheme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return resolveTheme(isDark ? 'dark' : 'light');
  } else {
    return resolveTheme(inputTheme);
  }
};
