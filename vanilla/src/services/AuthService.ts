import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';

import { auth } from '../firebase/firebase';

/**
 * Firebase authentication service.
 */
export class AuthService {
/**
 * Method for signing up with given email and password.
 * @param email - User`s email.
 * @param password - User`s password.
 * @returns Function for signing up.
 */
  public static signUpUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Method for signing in with given email and password.
   * @param email - User`s email.
   * @param password - User`s password.
   * @returns Function for signing in.
   */
  public static signInUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Method for signing out the user.
   */
  public static signOutUser(): void {
    signOut(auth);
  }
}
