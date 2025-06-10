import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { AuthService } from '../../Services/auth/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['signup'], { 
      isLoggedIn: { set: jasmine.createSpy() } 
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    authService.signup.and.returnValue(of({ token: 'mock-token' }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.signup with form data', () => {
    component.data = { email: 'test@example.com', password: '123456' };
    component.signup();
    expect(authService.signup).toHaveBeenCalledWith(component.data);
  });

  it('should handle signup error', () => {
    authService.signup.and.returnValue(throwError(() => new Error('Signup failed')));
    component.signup();
    expect(component.errorMessage).toBe('Signup failed. Please try again.');
  });

  it('should navigate to weather page on successful signup', () => {
    component.signup();
    expect(router.navigate).toHaveBeenCalledWith(['/weather']);
  });
});