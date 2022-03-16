import { AuthInfo } from 'src/app/core/models/auth-info';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { catchError, defer, ignoreElements, map, Observable, throwError } from 'rxjs';
import { authState } from 'rxfire/auth';

import { FirebaseAuthError } from './firebase-auth-error';

/**
 * Service for firebase authentication.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  /**
   * Shows if the user is signed in or not.
   */
  public readonly isSignedIn$: Observable<boolean>;

  public constructor(private readonly auth: Auth) {
    this.isSignedIn$ = authState(auth).pipe(
      map(user => user !== null),
    );
  }

  /**
   * Method for logging in with email and password.
   * @param authInfo - Auth information to sign in.
   */
  public signIn(authInfo: AuthInfo): Observable<Error> {
    return defer(() => signInWithEmailAndPassword(this.auth, authInfo.email, authInfo.password)).pipe(
      ignoreElements(),
      catchError((error: FirebaseError) => this.handleSignInError(error)),
    );
  }

  /**
   * Method for signing out.
   */
  public signOut(): Observable<void> {
    return defer(() => signOut(this.auth));
  }

  /**
   * Method for signing up.
   * @param authInfo - Auth information to sign up.
   */
  public signUp(authInfo: AuthInfo): Observable<null | Error> {
    return defer(() => createUserWithEmailAndPassword(this.auth, authInfo.email, authInfo.password)).pipe(
      ignoreElements(),
      catchError((error: FirebaseError) => this.handleSignUpError(error)),
    );
  }

  /**
   * Method for handling firebase errors when trying to log in.
   * @param error - Occurred firebase error such as incorrect email of password.
   * @returns - A new error stream to use in catchError rxjs operator.
   * @throws - Error with the message in case if something goes wrong during signing in.
   */
  private handleSignInError(error: FirebaseError): Observable<Error> {
    switch (error.code) {
      case FirebaseAuthError.WrongEmail:
      case FirebaseAuthError.WrongPassword:
        return throwError(() => new Error('Incorrect email of password'));
      case FirebaseAuthError.TooManyLogInAttempts:
        return throwError(() => new Error(
          'Access to this account has been temporarily disabled due to many failed login attempts. Please try later.',
        ));
      default:
        return throwError(() => new Error('Unexpected error occurred. Please try later.'));
    }
  }

  /**
   * Method for handling firebase errors when trying to register.
   * @param error - Occurred firebase error such as weak password.
   * @returns - A new error stream to use in catchError rxjs operator.
   * @throws - Error with the message in case if something goes wrong during signing up.
   */
  private handleSignUpError(error: FirebaseError): Observable<Error> {
    switch (error.code) {
      case FirebaseAuthError.EmailAlreadyInUse:
        return throwError(() => new Error('Email already in use.'));
      case FirebaseAuthError.WeakPassword:
        return throwError(() => new Error('Too weak password.'));
      default:
        return throwError(() => new Error('Unexpected error occurred. Please try later.'));
    }
  }
}
