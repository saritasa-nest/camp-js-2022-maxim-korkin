import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

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
  public static signUpUser(email: string, password: string): Function {
    return async() => {
      await createUserWithEmailAndPassword(auth, email, password);
    };
  }

  /**
   * Method for signing in with given email and password.
   * @param email - User`s email.
   * @param password - User`s password.
   * @returns Function for signing in.
   */
  public static signInUser(email: string, password: string): Function {
    return async() => {
      await signInWithEmailAndPassword(auth, email, password);
    };
  }

  /**
   * Method for changing the page when the user signs in or out.
   */
  public static startObservingUserActions(): void {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user);
      } else {
        console.log('no user');
      }
    });
  }
}
