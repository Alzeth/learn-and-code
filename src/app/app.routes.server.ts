import { RenderMode, ServerRoute } from '@angular/ssr';

import { ROUTES } from 'app/constants';

export const serverRoutes: ServerRoute[] = [
  {
    path: ROUTES.LESSONS,
    renderMode: RenderMode.Client,
  },
  {
    path: ROUTES.LESSON,
    renderMode: RenderMode.Client,
  },
  {
    path: ROUTES.COURSES,
    renderMode: RenderMode.Client,
  },
  {
    path: ROUTES.COURSE,
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
