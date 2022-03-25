import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged,
} from 'firebase/auth';
import { AuthInfo } from 'src/models/AuthInfo';
import { Firebase } from './firebase.service';
import { UserInfo } from '../../models/UserInfo';
import { UserCredentialsMapper } from '../mappers/user.mapper';

const { auth } = Firebase;

/** Auth service. */
export namespace AuthService {
  /**
   * Function for signing in through firebase with email and password.
   * @param authInfo - Required auth information.
   */
  export async function signInUser(authInfo: AuthInfo): Promise<UserInfo> {
    const userCredentials = await signInWithEmailAndPassword(auth, authInfo.email, authInfo.password);
    return UserCredentialsMapper.fromUserCredentials(userCredentials);
  }

  /**
   * Function for signing up to firebase with email and password.
   * @param authInfo - Required auth information.
   */
  export async function signUpUser(authInfo: AuthInfo): Promise<UserInfo> {
    const userCredentials = await createUserWithEmailAndPassword(auth, authInfo.email, authInfo.password);
    return UserCredentialsMapper.fromUserCredentials(userCredentials);
  }

  /** Function for signing out. */
  export function signOutUser(): Promise<void> {
    return signOut(auth);
  }

  /** Function which tries to get a user from cache. */
  export function getUser(): Promise<UserInfo | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        user => {
          unsubscribe();
          resolve(user !== null ? UserCredentialsMapper.fromUserDto(user) : user);
        },
        error => {
          unsubscribe();
          reject(error);
        },
      );
    });
  }
}
