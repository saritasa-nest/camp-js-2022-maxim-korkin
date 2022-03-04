import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthTypes } from '../AuthTypes';

/**
 * Login form component.
 */
@Component({
  selector: 'sw-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  /** Auth type of this form. */
  public readonly authType = AuthTypes.SignUp;
}
