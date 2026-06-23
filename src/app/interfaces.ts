export interface ILesson {
  id: string,
  title: string,
  href: string,
  description: string,
  date: string,
  datetime: string,
  icon: string,
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
