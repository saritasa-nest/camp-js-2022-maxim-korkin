import { Subject, takeUntil } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/AuthService/auth.service';

/**
 * Navbar component.
 */
@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {

  /**
   * Stream showing if the user is signed in or not.
   */
  public readonly isSignedIn$ = this.authService.isSignedIn$;

  /**
   * Destroy stream for handling subscriptions.
   */
  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly authService: AuthService,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Method for signing out when the user click sign out button.
   */
  public signOut(): void {
    this.authService.signOut().pipe(
      takeUntil(this.destroy$),
    )
      .subscribe();
  }

}
