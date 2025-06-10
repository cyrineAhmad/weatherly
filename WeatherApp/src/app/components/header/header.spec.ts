import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth';

// Mock services
class MockAuthService {
  isLoggedIn() { return false; }
}

class MockRouter {
  url = '/';
  navigate(path: string[]) { return Promise.resolve(true); }
}

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header], // Header is standalone
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Test 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Logout Button Visibility - all cases in one test with spy reset
  it('should show logout button only when user is logged in and not on login/signup pages', () => {
    // Create the spy once and reuse it
    const isLoggedInSpy = spyOn(authService, 'isLoggedIn');

    // Case 1: Not logged in -> no button
    isLoggedInSpy.and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.logout-btn')).toBeNull();

    // Reset the spy for next case
    isLoggedInSpy.calls.reset();

    // Case 2: Logged in and not on auth pages -> show button
    isLoggedInSpy.and.returnValue(true);
    (router as any).url = '/dashboard'; // Mock URL
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.logout-btn')).toBeTruthy();

    // Reset the spy for next case
    isLoggedInSpy.calls.reset();

    // Case 3: Logged in but on login page -> no button
    isLoggedInSpy.and.returnValue(true);
    (router as any).url = '/login';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.logout-btn')).toBeNull();
  });

  // Test 3: Logout Functionality
  it('should call logout() and navigate to login page', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(localStorage, 'clear'); // Mock localStorage
    spyOn(router, 'navigate'); // Mock router.navigate

    // Trigger logout
    component.logout();

    // Verify
    expect(localStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});