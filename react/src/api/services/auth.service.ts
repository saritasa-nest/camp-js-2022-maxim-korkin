import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential,
} from 'firebase/auth';
import { Firebase } from './firebase.service';

const { auth } = Firebase;

/**
 * Auth service.
 */
export namespace AuthService {
  /**
   * Function for signing in through firebase with email and password.
   * @param email - Email.
   * @param password - Password.
   */
  export function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Function for signing up to firebase with email and password.
   * @param email - Email.
   * @param password - Password.
   */
  export function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Function for signing out.
   */
  export function signOutUser(): Promise<void> {
    return signOut(auth);
  }
}
