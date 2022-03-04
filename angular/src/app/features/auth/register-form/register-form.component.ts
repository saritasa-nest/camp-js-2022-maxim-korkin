import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthTypes } from '../AuthTypes';

/**
 * Register form component.
 */
@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {

  /** Auth type of this form. */
  public readonly authType = AuthTypes.SignUp;

  public constructor(
  ) { }
}
