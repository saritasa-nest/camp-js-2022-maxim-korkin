import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { Firebase } from '../firebase/firebase.service';

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
  export async function signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Function for signing up to firebase with email and password.
   * @param email - Email.
   * @param password - Password.
   */
  export async function signUp(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Function for signing out.
   */
  export async function signOutUser(): Promise<void> {
    await signOut(auth);
  }
}
