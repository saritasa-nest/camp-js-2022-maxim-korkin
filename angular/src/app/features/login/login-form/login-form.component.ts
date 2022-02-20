import { Component, ChangeDetectionStrategy } from '@angular/core';

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

  public constructor() { }

}
