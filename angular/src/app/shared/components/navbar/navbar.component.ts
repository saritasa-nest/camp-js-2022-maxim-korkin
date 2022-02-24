import { Subject, takeUntil } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

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

  public constructor(public readonly authService: AuthService) { }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Destroy stream for handling subscriptions.
   */
  private destroy$ = new Subject<void>();

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
