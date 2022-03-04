import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import { AuthTypes } from '../AuthTypes';

/**
 * Auth form component.
 */
@Component({
  selector: 'sw-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnDestroy {

  /**
   * Header of the form.
   */
  @Input()
  public formHeader = '';

  /** Auth type of the form. */
  @Input()
  public authType: AuthTypes | null = null;

  /**
   * Error message.
   */
  public error$ = new BehaviorSubject<string | null>(null);

  /**
   * Authentication form group.
   */
  public readonly authForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(/\S+/)],
    ],
  });

  private readonly destroy$ = new Subject<void>();

  private readonly subscriber = {
    next: () => {
      this.error$.next(null);
    },
    error: (error: Error) => {
      this.error$.next(error.message);
    },
    complete: () => {
      this.router.navigate(['/']);
    },
  };

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * OnSubmit function.
   */
  public onSubmit(): void {
    const authInfo = {
      email: this.emailInput,
      password: this.passwordInput,
    };

    if (this.authType === AuthTypes.SignIn) {
      this.authService.signIn(authInfo).pipe(
        takeUntil(this.destroy$),
      )
        .subscribe(this.subscriber);
    } else if (this.authType === AuthTypes.SignUp) {
      this.authService.signUp(authInfo).pipe(
        takeUntil(this.destroy$),
      )
        .subscribe(this.subscriber);
    } else if (this.authType === null) {
      console.error('Type of auth form is unrecognized.');
    }
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
