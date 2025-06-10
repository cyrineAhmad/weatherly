import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AuthService } from '../../Services/auth/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login'], { isLoggedIn: { set: jasmine.createSpy() } });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    authService.login.and.returnValue(of({ token: 'mock-token' }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login with credentials', () => {
    component.credentials = { email: 'test@example.com', password: '123456' };
    component.login();
    expect(authService.login).toHaveBeenCalledWith(component.credentials);
  });

  it('should handle login error', () => {
    authService.login.and.returnValue(throwError(() => new Error('Unauthorized')));
    component.login();
    expect(component.errorMessage).toBe('Invalid email or password');
  });
});