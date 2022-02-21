import { FirebaseError } from 'firebase/app';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';

/**
 * Component with login form.
 */
@Component({
  selector: 'sw-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /**
   * Stream for login errors.
   */
  public logInError$ = new Subject<string | null>();

  /**
   * FormControl instance for email input field.
   */
  public emailControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)]);

  /**
   * FormControl instance for password input field.
   */
  public passwordControl = new FormControl('', [Validators.required, Validators.pattern(/\S+/)]);

  /**
   * Method for logging when the form is submitted.
   */
  public onSubmit(): void {
    this.authService.signIn(this.emailControl.value, this.passwordControl.value).subscribe({
      next: () => {
        this.logInError$.next(null);
        this.router.navigate(['/']);
      },
      error: (error: FirebaseError) => {
        this.logInError$.next(error.message);
      },
    });
  }
}
