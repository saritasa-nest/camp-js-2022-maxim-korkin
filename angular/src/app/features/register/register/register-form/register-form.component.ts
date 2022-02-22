import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Register form component.
 */
@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {

  public constructor() { }
}
