import { Component, ChangeDetectionStrategy } from '@angular/core';

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

  public constructor() { }

}
