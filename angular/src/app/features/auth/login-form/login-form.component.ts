import { Component, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs';

import { AuthFormComponent } from '../auth-form/auth-form.component';

/**
 * Login form component.
 */
@Component({
  selector: 'sw-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends AuthFormComponent {

  /** Form header. */
  public readonly formHeader = 'Login';

  /**
   * OnSubmit method for signing in.
   */
  public onSubmit(): void {
    const authInfo = {
      email: this.emailInput,
      password: this.passwordInput,
    };
    this.authService.signIn(authInfo).pipe(
      takeUntil(this.destroy$),
    )
      .subscribe(this.subscriber);
  }
}
