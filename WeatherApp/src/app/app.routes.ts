import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { WeatherLayout } from './components/weather-layout/weather-layout';

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
