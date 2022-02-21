import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Guard which check if the user is signed in or not.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private authService: AuthService) {}

  /**
   * CanActivate guard which allows links only for authenticated users.
   * @returns
   */
  public canActivate(
  ): Observable<boolean> {
    return this.authService.isSignedIn$.pipe(
      map((value => !value)),
    );
  }

}
