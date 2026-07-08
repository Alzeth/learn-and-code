export interface ILesson {
  id: string,
  title: string,
  href: string,
  description: string,
  date: string,
  datetime: string,
  icon: string,
  theoryMd: string,
}

export interface ICourseLesson {
  id: string,
  title: string,
  description: string,
  prevLesson: string
  nextLesson: string
}

export interface ICourse {
  id: string,
  title: string,
  description: string,
  tableOfContents: ICourseLesson[]
}

export interface IUser {
  id: string;
  email: string;
}

export interface ILessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
}

export interface ICourseProgress {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}

export interface IUserProgress {
  lessons: ILessonProgress[];
  courses: ICourseProgress[];
}
