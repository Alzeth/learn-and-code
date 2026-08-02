import { ICourse, ICourseProgress, ILesson, ILessonProgress } from 'app/interfaces';

export interface IResponseErrorEntity {
  message: string;
  code?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T | null;
  error: IResponseErrorEntity | null;
  meta: {
    requestId: string;
    timestamp: string;
  };
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

export interface IGeolocationResponse {
  city: IGeolocationCity;
  country: IGeolocationCountry;
  state: IGeolocationState;
  location: IGeolocationLocation;
  continent: IGeolocationContinent;
  subdivisions: IGeolocationSubdivision[];
  ip: string;
}

export interface IGeolocationCity {
  name: string;
  names: IGeolocationNames;
}

export interface IGeolocationNames {
  en: string;
  de?: string;
  es?: string;
  fa?: string;
  fr?: string;
  ja?: string;
  ko?: string;
  'pt-BR'?: string;
  ru?: string;
  'zh-CN'?: string;
}

export interface IGeolocationContinent {
  code: string;
  name: string;
  names: IGeolocationNames;
  geoname_id: number;
}

export interface IGeolocationCountry {
  name: string;
  iso_code: string;
  names: IGeolocationNames;
  geoname_id: number;
  name_native: string;
  phone_code: string;
  capital: string;
  currency: string;
  flag: string;
  languages: IGeolocationLanguage[];
}

export interface IGeolocationLanguage {
  iso_code: string;
  name: string;
  name_native: string;
}

export interface IGeolocationLocation {
  latitude: number;
  longitude: number;
}

export interface IGeolocationState {
  name: string;
}

export interface IGeolocationSubdivision {
  names: IGeolocationNames;
}
