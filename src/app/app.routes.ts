import { Routes } from '@angular/router';

import { HomePage } from 'app/pages/home-page/home-page';
import { AboutPage } from 'app/pages/about-page/about-page';
import { LoginPage } from 'app/pages/login-page/login-page';
import { CoursePage } from 'app/pages/course-page/course-page';
import { LessonPage } from 'app/pages/lesson-page/lesson-page';
import { ProfilePage } from 'app/pages/profile-page/profile-page';
import { CoursesPage } from 'app/pages/courses-page/courses-page';
import { LessonsPage } from 'app/pages/lessons-page/lessons-page';
import { RegisterPage } from 'app/pages/register-page/register-page';
import { NotFoundPage } from 'app/pages/not-found-page/not-found-page';
import { LessonsResolver } from 'app/resolvers/lessons.resolver';
import { ProfileResolver } from 'app/resolvers/profile.resolver';
import { CoursesResolver } from 'app/resolvers/courses.resolver';
import { LessonResolver } from 'app/resolvers/lesson.resolver';
import { CourseResolver } from 'app/resolvers/course.resolver';
import { authGuard } from 'app/guards/auth.guard';

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
  {
    path: ROUTES.LESSON,
    canActivate: [authGuard],
    component: LessonPage,
    resolve: {
      lesson: LessonResolver,
    }
  },
  {
    path: ROUTES.COURSES,
    component: CoursesPage,
    resolve: {
      courses: CoursesResolver,
    }
  },
  {
    path: ROUTES.COURSE,
    canActivate: [authGuard],
    component: CoursePage,
    resolve: {
      course: CourseResolver,
    }
  },
  { path: ROUTES.AUTH.LOGIN, component: LoginPage },
  { path: ROUTES.AUTH.REGISTER, component: RegisterPage },
  {
    path: ROUTES.PROFILE,
    canActivate: [authGuard],
    component: ProfilePage,
    resolve: {
      profile: ProfileResolver,
    }
  },
  { path: ROUTES.ABOUT, component: AboutPage },
  { path: ROUTES.NOT_FOUND, component: NotFoundPage },
  { path: '**', redirectTo: ROUTES.NOT_FOUND },
];
