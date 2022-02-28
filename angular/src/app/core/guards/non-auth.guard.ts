import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Guard which allows navigation to the routes for unauthenticated users only.
 */
@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /**
   * @inheritdoc
   */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isSignedIn$.pipe(
      map(isSignedIn => (isSignedIn === false) ? true : this.router.parseUrl('/')),
    );
  }
}
