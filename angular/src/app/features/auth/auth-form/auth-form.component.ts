import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { emailValidator } from 'src/app/shared/directives/email-validator.directive';

import { AuthInfo } from '../../../core/models/AuthInfo';

/**
 * Auth form component.
 */
@Component({
  selector: 'sw-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {

  /**
   * Header of the form.
   */
  @Input()
  public formHeader = '';

  /**
   * Error message or null.
   */
  @Input()
  public error: string | null = null;

  /**
   * Submit event emitter.
   */
  @Output()
  private readonly submitEvent = new EventEmitter<AuthInfo>();

  /**
   * Authentication form group.
   */
  public readonly authForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        emailValidator(),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(/\S+/)],
    ],
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
  ) {}

  /**
   * OnSubmit function.
   */
  public onSubmit(): void {
    this.submitEvent.emit({
      email: this.emailInput,
      password: this.passwordInput,
    });
  }

  private get emailInput(): string {
    const emailField = this.authForm.get('email');
    return (emailField !== null) ? emailField.value : '';
  }

  private get passwordInput(): string {
    const passwordField = this.authForm.get('password');
    return (passwordField !== null) ? passwordField.value : '';
  }
}
