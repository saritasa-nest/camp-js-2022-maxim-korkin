import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
   * FormControl instance for email input field.
   */
  public readonly emailControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)]);

  /**
   * FormControl instance for password input field.
   */
  public readonly passwordControl = new FormControl('', [Validators.required, Validators.pattern(/\S+/)]);

  /**
   * Submit event emitter.
   */
  @Output()
  private readonly submitEvent = new EventEmitter<AuthInfo>();

  /**
   * OnSubmit function.
   */
  public onSubmit(): void {
    this.submitEvent.emit({
      email: this.emailControl.value,
      password: this.passwordControl.value,
    });
  }
}
