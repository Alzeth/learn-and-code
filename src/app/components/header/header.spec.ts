import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Header } from './header';
import { Router } from '@angular/router';

describe('Header Component', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    // Mock Router
    mockRouter = {
      navigate: vitest.fn(),
    };

    // Set up the testing module
    await TestBed.configureTestingModule({
      declarations: [Header],
      providers: [
        { provide: Router, useValue: mockRouter }, // Provide the mock Router
      ],
    }).compileComponents();

    // Create the component fixture
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance; // Get the component instance
    fixture.detectChanges(); // Trigger component change detection
  });

  it('should create the Header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo component (`app-logo`)', () => {
    const logoElement = fixture.debugElement.query(By.css('app-logo'));
    expect(logoElement).toBeTruthy();
  });

  it('should contain navigation links with proper `routerLink` attributes', () => {
    // Query all navigation links
    const navLinks = fixture.debugElement.queryAll(By.css('a[routerLink]'));

    const coursesLink = navLinks.find(
      (link) => link.attributes['routerLink'] === '/courses'
    );
    const lessonsLink = navLinks.find(
      (link) => link.attributes['routerLink'] === '/lessons'
    );
    const loginLink = navLinks.find(
      (link) => link.attributes['routerLink'] === '/login'
    );

    expect(coursesLink).toBeTruthy();
    expect(lessonsLink).toBeTruthy();
    expect(loginLink).toBeTruthy();

    // Verify text content of the links
    expect(coursesLink?.nativeElement.textContent.trim()).toBe('Courses');
    expect(lessonsLink?.nativeElement.textContent.trim()).toBe('Lessons');
    expect(loginLink?.nativeElement.textContent).toContain('Log in');
  });

  it('should navigate to the login page when the "Log in" link is clicked', () => {
    const loginLinkElement = fixture.debugElement.query(
      By.css('a[routerLink="/login"]')
    ).nativeElement;

    // Simulate a click event
    loginLinkElement.click();

    // Verify that the `navigate` method was called with the correct route
    expect(mockRouter.navigate).toHaveBeenCalledOnce();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should toggle the `isOpen` signal when modified', () => {
    // Verify the initial state of `isOpen` signal
    expect(component.isOpen()).toBe(false);

    // Change the signal value
    component.isOpen.set(true);

    // Check if the signal value was updated
    expect(component.isOpen()).toBe(true);
  });
});
