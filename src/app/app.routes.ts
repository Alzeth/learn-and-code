import { Routes } from '@angular/router';

import { CoursePage } from '@app/pages/course-page/course-page';
import { CoursesPage } from '@app/pages/courses-page/courses-page';
import { HomePage } from '@app/pages/home-page/home-page';
import { LessonPage } from '@app/pages/lesson-page/lesson-page';
import { LessonsPage } from '@app/pages/lessons-page/lessons-page';
import { LoginPage } from '@app/pages/login-page/login-page';
import { NotFoundPage } from '@app/pages/not-found-page/not-found-page';
import { RegisterPage } from '@app/pages/register-page/register-page';
import { LessonsResolver } from '@app/resolvers/lessons.resolver';
import { CoursesResolver } from '@app/resolvers/courses.resolver';

import { ROUTES } from './constants';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  {
    path: ROUTES.LESSONS,
    component: LessonsPage,
    resolve: {
      lessons: LessonsResolver,
    }
  },
  { path: ROUTES.LESSON, component: LessonPage },
  {
    path: ROUTES.COURSES,
    component: CoursesPage,
    resolve: {
      courses: CoursesResolver,
    }
  },
  { path: ROUTES.COURSE, component: CoursePage },
  { path: ROUTES.AUTH.LOGIN, component: LoginPage },
  { path: ROUTES.AUTH.REGISTER, component: RegisterPage },
  { path: ROUTES.NOT_FOUND, component: NotFoundPage },
  { path: '**', redirectTo: ROUTES.NOT_FOUND },
];
