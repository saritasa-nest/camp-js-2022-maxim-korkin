/**
 * Auth state.
 */
export interface AuthState {

  /** Shows if the user is signed in or not. */
  readonly isSignedIn: boolean;

  /** Sign In error. */
  readonly signInError?: string;

  /** Sign Up error. */
  readonly signUpError?: string;
}

export const initialState: AuthState = {
  isSignedIn: false,
};
