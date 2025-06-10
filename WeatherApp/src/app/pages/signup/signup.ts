import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth'; 
import { Header} from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
@Component({
  standalone: true, 
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [CommonModule, FormsModule,Header,Footer],
})
export class SignupComponent {
  data = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.isLoggedIn.set(true);
        this.router.navigate(['/weather']);
      },
      error: (err) => {
        this.errorMessage = 'Signup failed. Please try again.';
        console.error('Signup error:', err);
      },
    });
  }
}
