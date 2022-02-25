import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { AuthInfo } from './../../../core/models/AuthInfo';

/**
 * Login form component.
 */
@Component({
  selector: 'sw-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnDestroy {

  /**
   * Error stream.
   */
  public readonly logInError$ = new Subject<string | null>();

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Method for logging in when the form is submitted.
   * @param authInfo - Auth information from the form.
   */
  public onSubmit(authInfo: AuthInfo): void {
    this.authService.signIn(authInfo.email, authInfo.password).pipe(
      takeUntil(this.destroy$),
    )
      .subscribe({
        next: () => {
          this.logInError$.next(null);
        },
        error: (error: Error) => {
          this.logInError$.next(error.message);
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
  }
}
