import { UserInfo } from '../../models/UserInfo';
/**
 * Auth state.
 */
export interface AuthState {

  /** Currently signed in user. */
  readonly userInfo: UserInfo | null;

  /** Shows if we are signing in or signing up at this moment. */
  readonly isLoading: boolean;

  /** Shows if we are getting a user from cache. */
  readonly isLoadingFromCache: boolean;

  /** Sign In error. */
  readonly signInError?: string;

  /** Sign Up error. */
  readonly signUpError?: string;
}

export const initialState: AuthState = {
  userInfo: null,
  isLoading: false,
  isLoadingFromCache: true,
};
