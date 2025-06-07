import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
 
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially set isLoggedIn to false if no token exists', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should set isLoggedIn to true if token exists', () => {
    localStorage.setItem('token', 'fake-token');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    const freshService = TestBed.inject(AuthService);
    expect(freshService.isLoggedIn()).toBeTrue();
  });

  it('should login and store token + update isLoggedIn', () => {
    const mockToken = 'jwt-token';
    const credentials = { email: 'test@test.com', password: '123456' };

    service.login(credentials).subscribe();

    const req = httpMock.expectOne('http://localhost:5000/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: mockToken });

    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should logout, remove token, and set isLoggedIn to false', () => {
    localStorage.setItem('token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
