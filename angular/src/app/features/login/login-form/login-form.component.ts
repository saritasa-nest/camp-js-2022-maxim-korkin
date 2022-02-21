import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  public constructor(public authService: AuthService) { }

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
      next: () => this.authService.isSignedIn$.next(true),

      // TODO(Maxim K.): error handling.
    });
  }
}
