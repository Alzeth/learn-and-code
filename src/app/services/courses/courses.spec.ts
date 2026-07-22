import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ICourse } from 'app/interfaces';
import { LoggerService } from 'app/services/logger';

import { API_BASE_URL, USE_LOCAL_DATA } from '../api.config';
import { IApiResponse, ICoursesResponse } from '../interfaces';
import { CoursesService } from './courses';

const mockCourses: ICourse[] = [
  { id: 'c1', title: 'Python Basics', description: 'Intro', tableOfContents: [] },
  { id: 'c2', title: 'Advanced Python', description: 'Advanced', tableOfContents: [] },
];
const mockCoursesResponse: ICoursesResponse = { courses: mockCourses };
const wrapResponse = <T>(data: T): IApiResponse<T> => ({
  success: true,
  data,
  error: null,
  meta: { requestId: 'r1', timestamp: '' },
});

function setup(useLocal: boolean) {
  const httpMock = { get: vi.fn() };
  TestBed.configureTestingModule({
    providers: [
      CoursesService,
      { provide: HttpClient, useValue: httpMock },
      { provide: API_BASE_URL, useValue: 'https://api.test' },
      { provide: USE_LOCAL_DATA, useValue: useLocal },
      { provide: LoggerService, useValue: { debug: vi.fn(), info: vi.fn() } },
    ],
  });
  return { service: TestBed.inject(CoursesService), httpMock };
}

describe('CoursesService (remote)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should be created', () => {
    const { service } = setup(false);
    expect(service).toBeTruthy();
  });

  it('getAll() should call remote endpoint and unwrap data', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse(mockCoursesResponse)));

    let result: ICoursesResponse | undefined;
    service.getAll().subscribe((resp) => (result = resp));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/courses');
    expect(result).toEqual(mockCoursesResponse);
  });

  it('getById() should call remote endpoint and unwrap data', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse(mockCourses[0])));

    let result: ICourse | undefined;
    service.getById('c1').subscribe((resp) => (result = resp));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/courses/c1');
    expect(result).toEqual(mockCourses[0]);
  });
});

describe('CoursesService (local)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getAll() should call courses.json when using local data', () => {
    const { service, httpMock } = setup(true);
    httpMock.get.mockReturnValue(of(mockCoursesResponse));

    service.getAll().subscribe();

    expect(httpMock.get).toHaveBeenCalledWith('courses.json');
  });

  it('getById() should filter from getAll() when using local data', () => {
    const { service, httpMock } = setup(true);
    httpMock.get.mockReturnValue(of(mockCoursesResponse));

    let result: ICourse | undefined;
    service.getById('c2').subscribe((resp) => (result = resp));

    expect(result).toEqual(mockCourses[1]);
  });
});
