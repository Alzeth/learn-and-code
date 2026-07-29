import { ICourse } from 'app/interfaces';

export interface IEnrolledCourse {
  course: ICourse;
  nextLessonId: string;
  percentage: number;
}
