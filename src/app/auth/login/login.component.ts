import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') form!: NgForm;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.form.invalid) {
      return;
    }

    let { email, password } = this.form.value;
    email = email.trim();
    
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }, 
      error: (err) => {
        const message = err.error.error.message;

        if (message == 'EMAIL_NOT_FOUND' || message == 'INVALID_PASSWORD') {
          this.errorMessage = "Wrong login credentials";
        } else {
          this.errorMessage = message;
        }
      }
    });
    
  }
}
