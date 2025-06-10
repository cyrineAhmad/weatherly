import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  authService = inject(AuthService);

  shouldShowLogout(): boolean {
    return this.authService.isLoggedIn() && 
           !this.router.url.includes('/login') && 
           !this.router.url.includes('/signup');
  }

  logout() {
    // Remove user/session info here if stored (e.g., token, localStorage)
    localStorage.clear(); // or localStorage.removeItem('token') etc.
    this.router.navigate(['/login']);
  }

}
