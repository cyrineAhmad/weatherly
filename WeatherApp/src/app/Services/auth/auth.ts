import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.set(true);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/api/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.isLoggedIn.set(true);
          }
        })
      );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/signup`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }
}
