import { Component, ChangeDetectionStrategy } from '@angular/core';
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
export class NavbarComponent {

  public constructor(public readonly authService: AuthService) { }

  /**
   * Method for signing out when the user click sign out button.
   */
  public signOut(): void {
    this.authService.signOut().subscribe();
  }

}
