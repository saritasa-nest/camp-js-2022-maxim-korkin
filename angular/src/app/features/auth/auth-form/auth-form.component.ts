import { Router } from '@angular/router';
import { BehaviorSubject, Observer, Subject } from 'rxjs';
import { OnDestroy, Directive } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';

/**
 * Abstract class which need to be extended in auth forms.
 */
@Directive()
export abstract class AuthFormComponent implements OnDestroy {

  /**
   * Header of the form.
   */
  public readonly abstract formHeader: string;

  /**
   * Error message.
   */
  public readonly error$ = new BehaviorSubject<string | null>(null);

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

  /** Used as parameter in takeUntil operators in sign in or sign up streams. */
  protected readonly destroy$ = new Subject<void>();

  /** Observer to use when subscribing to sign in or sign up streams. */
  protected readonly observer: Observer<Error | null> = {
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
    protected readonly formBuilder: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly router: Router,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * OnSubmit method.
   */
  public abstract onSubmit(): void ;

  /** Email field input. */
  protected get emailInput(): string {
    const emailField = this.authForm.get('email');
    return (emailField !== null) ? emailField.value : '';
  }

  /** Password field input. */
  protected get passwordInput(): string {
    const passwordField = this.authForm.get('password');
    return (passwordField !== null) ? passwordField.value : '';
  }
}
