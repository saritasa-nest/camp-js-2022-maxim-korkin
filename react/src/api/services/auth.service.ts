import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged,
} from 'firebase/auth';
import { Firebase } from './firebase.service';

import { UserInfo } from '../../models/user';
import { UserMapper } from '../mappers/user.mapper';

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
  export async function signIn(email: string, password: string): Promise<UserInfo> {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return UserMapper.fromUserCredentials(userCredentials);
  }

  /**
   * Function for signing up to firebase with email and password.
   * @param email - Email.
   * @param password - Password.
   */
  export async function signUp(email: string, password: string): Promise<UserInfo> {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    return UserMapper.fromUserCredentials(userCredentials);
  }

  /**
   * Function for signing out.
   */
  export function signOutUser(): Promise<void> {
    return signOut(auth);
  }

  /** Function which tries to get a user from cache. */
  export function getUser(): Promise<UserInfo | null> {
    return new Promise((resolve, reject) => {
      try {
        const unsubscribe = onAuthStateChanged(auth, user => {
          unsubscribe();
          resolve(user !== null ? UserMapper.fromUserDto(user) : user);
        });
      } catch (error: unknown) {
        reject(error);
      }
    });
  }
}
