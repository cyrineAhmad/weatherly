import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.isLoggedIn.set(true);
        this.router.navigate(['/weather']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password'; 
        console.error('Login error:', err);
      },
    });
  }
}
