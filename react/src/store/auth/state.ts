/**
 * Auth state.
 */
export interface AuthState {

  /** Shows if the user is signed in or not. */
  readonly isSignedIn: boolean;

  /** Error. */
  readonly error?: string;
}

export const initialState: AuthState = {
  isSignedIn: false,
};
