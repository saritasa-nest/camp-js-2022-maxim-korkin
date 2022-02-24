import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Register form component.
 */
@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnDestroy {

  public constructor(
    private readonly router: Router,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  /**
   * Destroy stream for handling subscriptions.
   */
  private destroy$ = new Subject<void>();

  /**
   * FormControl instance for email input field.
   */
  public emailControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)]);

  /**
   * FormControl instance for password input field.
   */
  public passwordControl = new FormControl('', [Validators.required, Validators.pattern(/\S+/)]);

  /**
   * Method for register when the form is submitted.
   */
  public onSubmit(): void {
    // TODO(Korkin M.) : Add registration.
  }
}
