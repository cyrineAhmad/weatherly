import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { WeatherLayout } from './pages/weather-page/weather-page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'weather',
    component: WeatherLayout,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'login' },
];
