import { Component, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs';

import { AuthFormComponent } from '../auth-form/auth-form.component';

/**
 * Register form component.
 */
@Component({
  selector: 'sw-register-form',
  templateUrl: '../auth-form/auth-form.component.html',
  styleUrls: ['../auth-form/auth-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent extends AuthFormComponent {

  /** Form header. */
  public formHeader = 'Register';

  /**
   * OnSubmit method for signing up.
   */
  public onSubmit(): void {
    const authInfo = {
      email: this.emailInput,
      password: this.passwordInput,
    };
    this.authService.signUp(authInfo).pipe(
      takeUntil(this.destroy$),
    )
      .subscribe(this.subscriber);
  }
}
