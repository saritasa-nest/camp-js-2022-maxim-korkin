import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Guard which allows links for unauthenticated users only.
 */
@Injectable()
export class NonAuthGuard implements CanActivate {

  public constructor(private readonly authService: AuthService) {}

  /**
   * @inheritdoc
   */
  public canActivate(
  ): Observable<boolean> {
    return this.authService.isSignedIn$.pipe(
      map((value => !value)),
    );
  }

}
