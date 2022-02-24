import { AuthService } from 'src/app/core/services/auth.service';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
   * Stream for register errors.
   */
  public readonly registerError$ = new Subject<string | null>();

  /**
   * FormControl instance for email input field.
   */
  public readonly emailControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)]);

  /**
   * FormControl instance for password input field.
   */
  public readonly passwordControl = new FormControl('', [Validators.required, Validators.pattern(/\S+/)]);

  /**
   * Destroy stream for handling subscriptions.
   */
  private readonly destroy$ = new Subject<void>();

  /**
   * Method for register when the form is submitted.
   */
  public onSubmit(): void {
    this.authService.signUp(this.emailControl.value, this.passwordControl.value).pipe(
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
