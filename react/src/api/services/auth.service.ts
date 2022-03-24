import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, Unsubscribe, onAuthStateChanged, User, NextOrObserver,
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

  /**
   * Subscribes to the auth state changes and.
   * @param callBack - Callback to call when auth state has changed.
   * @returns Unsubscribe function.
   */
  export function subscribeToAuthStateChange(callBack: NextOrObserver<User>): Unsubscribe {
    return onAuthStateChanged(auth, callBack);
  }
}
