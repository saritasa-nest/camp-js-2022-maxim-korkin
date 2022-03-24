import { UserInfo } from '../../models/user';
/**
 * Auth state.
 */
export interface AuthState {

  /** Currently signed in user. */
  readonly userInfo: UserInfo | null;

  /** Shows if the user is signed in or not. */
  readonly isSignedIn: boolean;

  /** Sign In error. */
  readonly signInError?: string;

  /** Sign Up error. */
  readonly signUpError?: string;
}

export const initialState: AuthState = {
  userInfo: null,
  isSignedIn: false,
};
