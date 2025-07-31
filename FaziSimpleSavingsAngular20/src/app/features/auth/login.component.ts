import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // ✅ FIX: Run this effect inside constructor (injection context)
    effect(() => {
      if (!this.auth.loginSuccessMessage()) {
        this.form.reset();
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.auth.login({
      email: email ?? '',
      password: password ?? '',
    });
  }
}
