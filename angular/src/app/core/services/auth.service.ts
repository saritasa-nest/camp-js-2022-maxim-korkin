import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { defer, map, Observable } from 'rxjs';
import { authState } from 'rxfire/auth';

/**
 * Service for firebase authentication.
 */
@Injectable()
export class AuthService {

  /**
   * Stream showing if the user is signed in or not.
   */
  public isSignedIn$: Observable<boolean>;

  public constructor(private readonly auth: Auth) {
    this.isSignedIn$ = authState(auth).pipe(
      map(user => user !== null),
    );
  }

  /**
   * Method for logging in with email and password.
   * @param email - Email to login.
   * @param password - Password to login.
   */
  public signIn(email: string, password: string): Observable<UserCredential> {
    return defer(() => signInWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Method for signing out.
   */
  public signOut(): Observable<void> {
    return defer(() => signOut(this.auth));
  }
}
