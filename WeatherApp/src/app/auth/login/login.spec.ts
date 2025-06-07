import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AuthService } from '../../Services/auth/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Mock AuthService
class MockAuthService {
  isLoggedIn = { set: jasmine.createSpy('set') };
  login(credentials: any) {
    return of({ token: 'mock-token' }); 
  }
}

// Mock Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call authService.login on login()', () => {
    const authService = TestBed.inject(AuthService);
    component.credentials = { email: 'test@example.com', password: '123456' };
    component.login();
    expect(authService.login).toBeDefined();
  });

  it('should show error message on login failure', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(
      throwError(() => new Error('Unauthorized'))
    );
    component.login();
    expect(component.errorMessage).toBe('Invalid email or password');
  });
});
