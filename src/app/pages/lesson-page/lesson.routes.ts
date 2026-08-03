import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { authGuard } from 'app/guards';
import { LessonResolver } from 'app/resolvers/lesson.resolver';

import { LessonPage } from './lesson-page';

const routes: Routes = [
  {
    path: '',
    component: LessonPage,
    canActivate: [authGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: { authMessage: 'guards.auth.lessons' },
    resolve: { lesson: LessonResolver },
    providers: [importProvidersFrom(MonacoEditorModule.forRoot()), provideMarkdown()],
  },
];

export default routes;
