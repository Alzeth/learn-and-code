import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ILesson } from 'app/interfaces';

import { API_BASE_URL, USE_LOCAL_DATA } from '../api.config';
import { IApiResponse, ILessonsResponse } from '../interfaces';
import { LessonsService } from './lessons';

const mockLesson: ILesson = {
  id: 'l1',
  title: 'Intro',
  href: 'intro',
  description: 'First lesson',
  date: '2024-01-01',
  datetime: '2024-01-01T00:00:00Z',
  icon: 'icon',
  theoryMd: '',
};
const mockResponse: ILessonsResponse = { lessons: [mockLesson] };
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
      LessonsService,
      { provide: HttpClient, useValue: httpMock },
      { provide: API_BASE_URL, useValue: 'https://api.test' },
      { provide: USE_LOCAL_DATA, useValue: useLocal },
    ],
  });
  return { service: TestBed.inject(LessonsService), httpMock };
}

describe('LessonsService (remote)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should be created', () => {
    const { service } = setup(false);
    expect(service).toBeTruthy();
  });

  it('getAll() should call remote endpoint and unwrap data', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse(mockResponse)));

    let result: ILessonsResponse | undefined;
    service.getAll().subscribe((v) => (result = v));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/lessons');
    expect(result).toEqual(mockResponse);
  });

  it('getAll() should return the same cached observable on repeated calls', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse(mockResponse)));

    const first = service.getAll();
    const second = service.getAll();

    expect(first).toBe(second);
    expect(httpMock.get).toHaveBeenCalledTimes(1);
  });

  it('invalidateAll() should clear the cache', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse(mockResponse)));

    service.getAll().subscribe();
    service.invalidateAll();
    service.getAll().subscribe();

    expect(httpMock.get).toHaveBeenCalledTimes(2);
  });

  it('getByHref() should call the dedicated remote endpoint', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse(mockLesson)));

    let result: ILesson | undefined;
    service.getByHref('intro').subscribe((v) => (result = v));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/lessons/intro');
    expect(result).toEqual(mockLesson);
  });

  it('getLessonTheory() should call the theory endpoint', () => {
    const { service, httpMock } = setup(false);
    httpMock.get.mockReturnValue(of(wrapResponse('# Hello')));

    let result: string | undefined;
    service.getLessonTheory('intro').subscribe((v) => (result = v));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/lessons/intro/theory');
    expect(result).toBe('# Hello');
  });
});

describe('LessonsService (local)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getAll() should call lessons.json when using local data', () => {
    const { service, httpMock } = setup(true);
    httpMock.get.mockReturnValue(of(mockResponse));

    service.getAll().subscribe();

    expect(httpMock.get).toHaveBeenCalledWith(expect.stringContaining('lessons.json'));
  });

  it('getByHref() should filter from local getAll()', () => {
    const { service, httpMock } = setup(true);
    httpMock.get.mockReturnValue(of(mockResponse));

    let result: ILesson | undefined;
    service.getByHref('intro').subscribe((v) => (result = v));

    expect(result).toEqual(mockLesson);
  });
});
