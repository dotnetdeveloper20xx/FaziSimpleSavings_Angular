import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

type User = {
  id: string;
  email: string;
  name: string;
};

type LoginDto = {
  email: string;
  password: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  private _user = signal<User | null>(null);
  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());
  readonly loginSuccessMessage = signal<string | null>(null);

  constructor() {
    this.restoreUser();
  }

  login(credentials: LoginDto) {
    this.api.post<any>('/api/auth/login', credentials).subscribe({
      next: (res) => {
        const token = res.data;

        if (!token) {
          console.error('Login response did not include token.');
          return;
        }

        localStorage.setItem('token', token);

        const user = this.decodeUserFromToken(token);
        this._user.set(user);
this.loginSuccessMessage.set(`Welcome back, ${user.name}!`);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  logout() {
    this._user.set(null);
    this.loginSuccessMessage.set(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  private restoreUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const user = this.decodeUserFromToken(token);
    this._user.set(user);
  }

  private decodeUserFromToken(token: string): User {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      };
    } catch (error) {
      console.error('Failed to decode JWT', error);
      return { id: '', email: '', name: '' }; // fallback to empty
    }
  }
}
