import { Routes } from '@angular/router';

import { authGuard } from 'app/guards';
import { unsavedChangesGuard } from 'app/guards';
import { AboutPage } from 'app/pages/about-page';
import { CoursePage } from 'app/pages/course-page';
import { CoursesPage } from 'app/pages/courses-page';
import { HomePage } from 'app/pages/home-page';
import { LessonsPage } from 'app/pages/lessons-page';
import { NotFoundPage } from 'app/pages/not-found-page';
import { ProfilePage } from 'app/pages/profile-page';
import { CourseResolver, CoursesResolver, LessonsResolver, ProfileResolver } from 'app/resolvers';

import { ROUTES } from './constants';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  {
    path: ROUTES.LESSONS,
    pathMatch: 'full',
    component: LessonsPage,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      lessons: LessonsResolver,
    },
  },
  {
    path: ROUTES.LESSON,
    loadChildren: () => import('app/pages/lesson-page/lesson.routes').then((mod) => mod.default),
  },
  {
    path: ROUTES.COURSES,
    component: CoursesPage,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      courses: CoursesResolver,
    },
  },
  {
    path: ROUTES.COURSE,
    canActivate: [authGuard],
    component: CoursePage,
    data: { authMessage: 'guards.auth.courses' },
    resolve: {
      course: CourseResolver,
    },
  },
  {
    path: ROUTES.AUTH.LOGIN,
    loadComponent: () => import('app/pages/login-page').then((mod) => mod.LoginPage),
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: ROUTES.AUTH.REGISTER,
    loadComponent: () => import('app/pages/register-page').then((mod) => mod.RegisterPage),
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    loadComponent: () =>
      import('app/pages/forgot-password-page').then((mod) => mod.ForgotPasswordPage),
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: ROUTES.AUTH.RESET_PASSWORD,
    loadComponent: () =>
      import('app/pages/reset-password-page').then((mod) => mod.ResetPasswordPage),
  },
  {
    path: ROUTES.PROFILE,
    canActivate: [authGuard],
    component: ProfilePage,
    data: { authMessage: 'guards.auth.profile' },
    resolve: {
      profile: ProfileResolver,
    },
  },
  { path: ROUTES.ABOUT, component: AboutPage },
  { path: ROUTES.NOT_FOUND, component: NotFoundPage },
  { path: '**', redirectTo: ROUTES.NOT_FOUND, pathMatch: 'full' },
];
