import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { App } from './app';

describe('App', () => {
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
