import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthInfo } from 'src/app/core/models/AuthInfo';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';

/**
 * Register form component.
 */
@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnDestroy {

  /**
   * Error stream.
   */
  public readonly registerError$ = new Subject<string | null>();

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
    this.authService.signUp(authInfo.email, authInfo.password).pipe(
      takeUntil(this.destroy$),
    )
      .subscribe({
        next: () => {
          this.registerError$.next(null);
        },
        error: (error: Error) => {
          this.registerError$.next(error.message);
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
  }
}
