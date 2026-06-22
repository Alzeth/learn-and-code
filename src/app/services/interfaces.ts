import { ICourse, ILesson } from '@app/interfaces';

export interface ILessonsResponse {
  lessons: ILesson[];
}

export interface ICoursesResponse {
  courses: ICourse[];
}
