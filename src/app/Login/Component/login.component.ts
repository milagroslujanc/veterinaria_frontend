import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatError]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;

  private validCredentials = {
    user: 'recepcion',
    pass: '123456'
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors || (!control.touched && !this.submitted)) {
      return '';
    }

    if (control.errors['required']) {
      return `${controlName === 'username' ? 'Usuario' : 'Contraseña'} es obligatorio`;
    }
    if (control.errors['minlength']) {
      return `${controlName === 'username' ? 'Usuario' : 'Contraseña'} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && (control.invalid && (control.touched || this.submitted)));
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    const { username, password } = this.loginForm.value;

    if (username === this.validCredentials.user && password === this.validCredentials.pass) {
      alert('Login exitoso');
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales inválidas.';
    }
  }
}