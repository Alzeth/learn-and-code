import { Routes } from '@angular/router';

import { authGuard } from 'app/guards/auth.guard';
import { unsavedChangesGuard } from 'app/guards/unsaved-changes.guard';
import { AboutPage } from 'app/pages/about-page/about-page';
import { CoursePage } from 'app/pages/course-page/course-page';
import { CoursesPage } from 'app/pages/courses-page/courses-page';
import { ForgotPasswordPage } from 'app/pages/forgot-password-page/forgot-password-page';
import { HomePage } from 'app/pages/home-page/home-page';
import { LessonPage } from 'app/pages/lesson-page/lesson-page';
import { LessonsPage } from 'app/pages/lessons-page/lessons-page';
import { LoginPage } from 'app/pages/login-page/login-page';
import { NotFoundPage } from 'app/pages/not-found-page/not-found-page';
import { ProfilePage } from 'app/pages/profile-page/profile-page';
import { RegisterPage } from 'app/pages/register-page/register-page';
import { ResetPasswordPage } from 'app/pages/reset-password-page/reset-password-page';
import { CourseResolver } from 'app/resolvers/course.resolver';
import { CoursesResolver } from 'app/resolvers/courses.resolver';
import { LessonResolver } from 'app/resolvers/lesson.resolver';
import { LessonsResolver } from 'app/resolvers/lessons.resolver';
import { ProfileResolver } from 'app/resolvers/profile.resolver';

import { ROUTES } from './constants';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  {
    path: ROUTES.LESSONS,
    pathMatch: 'full',
    component: LessonsPage,
    resolve: {
      lessons: LessonsResolver,
    },
  },
  {
    path: ROUTES.LESSON,
    canActivate: [authGuard],
    component: LessonPage,
    data: { authMessage: 'Please log in to access lessons.' },
    resolve: {
      lesson: LessonResolver,
    },
  },
  {
    path: ROUTES.COURSES,
    component: CoursesPage,
    resolve: {
      courses: CoursesResolver,
    },
  },
  {
    path: ROUTES.COURSE,
    canActivate: [authGuard],
    component: CoursePage,
    data: { authMessage: 'Please log in to access courses.' },
    resolve: {
      course: CourseResolver,
    },
  },
  { path: ROUTES.AUTH.LOGIN, component: LoginPage, canDeactivate: [unsavedChangesGuard] },
  { path: ROUTES.AUTH.REGISTER, component: RegisterPage, canDeactivate: [unsavedChangesGuard] },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    canDeactivate: [unsavedChangesGuard],
  },
  { path: ROUTES.AUTH.RESET_PASSWORD, component: ResetPasswordPage },
  {
    path: ROUTES.PROFILE,
    canActivate: [authGuard],
    component: ProfilePage,
    data: { authMessage: 'Please log in to view your profile.' },
    resolve: {
      profile: ProfileResolver,
    },
  },
  { path: ROUTES.ABOUT, component: AboutPage },
  { path: ROUTES.NOT_FOUND, component: NotFoundPage },
  { path: '**', redirectTo: ROUTES.NOT_FOUND, pathMatch: 'full' },
];
