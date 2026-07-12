import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ILessonProgress } from 'app/interfaces';

import { API_BASE_URL } from '../api.config';
import { IApiResponse, ILessonProgressResponse, IUserProgressResponse } from '../interfaces';
import { UserProgressService } from './user-progress.service';

const mockLessonProgress: ILessonProgress = {
  lessonId: 'l1',
  completed: true,
  completedAt: '2024-01-01T00:00:00Z',
};
const mockUserProgress: IUserProgressResponse = {
  lessons: [mockLessonProgress],
  courses: [{ courseId: 'c1', totalLessons: 5, completedLessons: 3, percentage: 60 }],
};
const wrapResponse = <T>(data: T): IApiResponse<T> => ({
  success: true,
  data,
  error: null,
  meta: { requestId: 'r1', timestamp: '' },
});

describe('UserProgressService', () => {
  let service: UserProgressService;
  let httpMock: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    httpMock = { get: vi.fn(), post: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        UserProgressService,
        { provide: HttpClient, useValue: httpMock },
        { provide: API_BASE_URL, useValue: 'https://api.test' },
      ],
    });
    service = TestBed.inject(UserProgressService);
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserProgress() should GET /progress and unwrap data', () => {
    httpMock.get.mockReturnValue(of(wrapResponse(mockUserProgress)));

    let result: IUserProgressResponse | undefined;
    service.getUserProgress().subscribe((resp) => (result = resp));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/progress');
    expect(result).toEqual(mockUserProgress);
  });

  it('getLessonProgress() should GET /progress/lessons/:href and unwrap data', () => {
    httpMock.get.mockReturnValue(of(wrapResponse(mockLessonProgress)));

    let result: ILessonProgress | undefined;
    service.getLessonProgress('intro').subscribe((resp) => (result = resp));

    expect(httpMock.get).toHaveBeenCalledWith('https://api.test/progress/lessons/intro');
    expect(result).toEqual(mockLessonProgress);
  });

  it('markLessonCompleted() should POST /progress/lessons/:href/complete and unwrap data', () => {
    const response: ILessonProgressResponse = { ...mockLessonProgress };
    httpMock.post.mockReturnValue(of(wrapResponse(response)));

    let result: ILessonProgressResponse | undefined;
    service.markLessonCompleted('intro').subscribe((resp) => (result = resp));

    expect(httpMock.post).toHaveBeenCalledWith(
      'https://api.test/progress/lessons/intro/complete',
      {},
    );
    expect(result).toEqual(response);
  });
});
