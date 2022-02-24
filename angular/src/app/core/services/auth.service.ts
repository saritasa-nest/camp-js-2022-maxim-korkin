import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { catchError, defer, map, mapTo, Observable, throwError } from 'rxjs';
import { authState } from 'rxfire/auth';

import { FirebaseAuthErrors } from './FirebaseAuthErrors';

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

  /**
   * Method for logging in with email and password.
   * @param email - Email to login.
   * @param password - Password to login.
   */
  public signIn(email: string, password: string): Observable<null | Error> {
    return defer(() => signInWithEmailAndPassword(this.auth, email, password)).pipe(
      mapTo(null),
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
   * @param email - Email.
   * @param password - Password.
   */
  public signUp(email: string, password: string): Observable<null | Error> {
    return defer(() => createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      mapTo(null),

      catchError((error: FirebaseError) => this.handleSignUpError(error)),
    );
  }

  /**
   * Method for handling firebase errors when trying to log in.
   * @param error - Occurred firebase error such as incorrect email of password.
   * @returns - A new error stream to use in catchError rxjs operator.
   */
  private handleSignInError(error: FirebaseError): Observable<Error> {
    if (error.code === FirebaseAuthErrors.WrongEmail || error.code === FirebaseAuthErrors.WrongPassword) {
      return throwError(() => new Error('Incorrect email of password'));
    } else if (error.code === FirebaseAuthErrors.TooManyLogInAttempts) {
      return throwError(() => new Error(
        'Access to this account has been temporarily disabled due to many failed login attempts. Please try later.',
      ));
    }
    return throwError(() => new Error('Unexpected error occurred. Please try later.'));
  }

  /**
   * Method for handling firebase errors when trying to register.
   * @param error - Occurred firebase error such as weak password.
   * @returns - A new error stream to use in catchError rxjs operator.
   */
  private handleSignUpError(error: FirebaseError): Observable<Error> {
    if (error.code === FirebaseAuthErrors.EmailAlreadyInUse) {
      return throwError(() => new Error('Email already in use.'));
    } else if (error.code === FirebaseAuthErrors.WeakPassword) {
      return throwError(() => new Error('Too weak password.'));
    }
    return throwError(() => new Error('Unexpected error occurred. Please try later.'));
  }
}
