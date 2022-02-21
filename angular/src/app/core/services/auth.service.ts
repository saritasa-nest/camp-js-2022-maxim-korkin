import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { authState } from 'rxfire/auth';

/**
 * Service for firebase authentication.
 */
@Injectable()
export class AuthService {

  public constructor(private readonly auth: Auth) {
    this.isSignedIn$ = authState(auth).pipe(
      map(user => user !== null),
    );
  }

  /**
   * Stream showing if the user is signed in or not.
   */
  public isSignedIn$: Observable<boolean>;

  private wrongEmailErrorCode = 'auth/user-not-found';

  private wrongPasswordErrorCode = 'auth/wrong-password';

  private tooManyLogInAttemptsErrorCode = 'auth/too-many-requests';

  /**
   * Method for handling firebase errors when trying to log in.
   * @param error - Occurred firebase error such as incorrect email of password.
   * @returns - A new error stream to use in catchError rxjs operator.
   */
  private handleSignInError(error: FirebaseError): Observable<Error> {
    if (error.code === this.wrongPasswordErrorCode || error.code === this.wrongEmailErrorCode) {
      return throwError(() => new Error('Incorrect email of password'));
    } else if (error.code === this.tooManyLogInAttemptsErrorCode) {
      return throwError(() => new Error(
        'Access to this account has been temporarily disabled due to many failed login attempts. Please try later.',
      ));
    }
    return throwError(() => new Error('Unexpected error occurred. Please try later.'));
  }

  /**
   * Method for logging in with email and password.
   * @param email - Email to login.
   * @param password - Password to login.
   */
  public signIn(email: string, password: string): Observable<UserCredential | Error> {
    return defer(() => signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error: FirebaseError) => this.handleSignInError(error)),
    );
  }

  /**
   * Method for signing out.
   */
  public signOut(): Observable<void> {
    return defer(() => signOut(this.auth));
  }
}
