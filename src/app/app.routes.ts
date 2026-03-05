import { Routes } from '@angular/router';
import { CoursePage } from '@pages/course-page/course-page';
import { CoursesPage } from '@pages/courses-page/courses-page';

import { HomePage } from '@pages/home-page/home-page';
import { LessonPage } from '@pages/lesson-page/lesson-page';
import { LessonsPage } from '@pages/lessons-page/lessons-page';
import { LoginPage } from '@pages/login-page/login-page';
import { NotFoundPage } from '@pages/not-found-page/not-found-page';
import { RegisterPage } from '@pages/register-page/register-page';

import { ROUTES } from './constants';

export const routes: Routes = [
  {path: '', component: HomePage, pathMatch: 'full'},
  {path: ROUTES.LESSONS, component: LessonsPage},
  {path: ROUTES.LESSON, component: LessonPage},
  {path: ROUTES.COURSES, component: CoursesPage},
  {path: ROUTES.COURSE, component: CoursePage},
  {path: ROUTES.AUTH.LOGIN, component: LoginPage},
  {path: ROUTES.AUTH.REGISTER, component: RegisterPage},
  {path: '*', component: NotFoundPage},
];
