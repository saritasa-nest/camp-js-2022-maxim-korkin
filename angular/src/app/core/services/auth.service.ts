import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

/**
 * Service for firebase authentication.
 */
@Injectable()
export class AuthService {

  public constructor(private auth: Auth) { }

  /**
   * Flag which indicates if the user is signed in.
   */
  public isSignedIn = false;

  /**
   * Method for logging in with email and password.
   * @param email - Email to login.
   * @param password - Password to login.
   */
  public async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);

      this.isSignedIn = true;
    } catch (error: unknown) {
      this.isSignedIn = false;
    }
  }

  /**
   * Method for signing out.
   */
  public async logout(): Promise<void> {
    await signOut(this.auth);
    this.isSignedIn = false;
  }
}
