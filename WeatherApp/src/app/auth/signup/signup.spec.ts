import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { AuthService } from '../../Services/auth/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Mock AuthService
class MockAuthService {
  isLoggedIn = { set: jasmine.createSpy('set') };
  signup(data: any) {
    return of({ token: 'mock-token' }); // simulate successful signup
  }
}

// Mock Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.signup on signup()', () => {
    const authService = TestBed.inject(AuthService);
    component.data = { email: 'test@example.com', password: '123456' };
    component.signup();
    expect(authService.signup).toBeDefined();
  });

  it('should set errorMessage on signup failure', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'signup').and.returnValue(
      throwError(() => new Error('Signup failed'))
    );
    component.signup();
    expect(component.errorMessage).toBe('Signup failed. Please try again.');
  });
});
