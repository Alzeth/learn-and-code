import { ICourse, ICourseProgress, ILesson, ILessonProgress } from 'app/interfaces';

export interface IResponseErrorEntity {
  message: string,
  code?: string,
}

export interface IApiResponse<T> {
  success: boolean,
  data: T | null,
  error: IResponseErrorEntity | null,
  meta: {
    requestId: string,
    timestamp: string,
  },
}

export interface ILessonsResponse {
  lessons: ILesson[];
}

export interface ICoursesResponse {
  courses: ICourse[];
}

export interface IAuthUser {
  id: string;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IAuthUser;
}

export interface IUserProgressResponse {
  lessons: ILessonProgress[];
  courses: ICourseProgress[];
}

export type ILessonProgressResponse = ILessonProgress;

export interface IMessageResponse {
  message: string;
}

export interface IToast {
  id: number;
  title: string;
  message: string;
  type: 'default' | 'destructive';
  icon?: string;
  dismissing: boolean;
}

export interface IToastOptions {
  title: string;
  message: string;
  type?: 'default' | 'destructive';
  icon?: string;
}
