import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects sign in state. */
export const selectIsSignedIn = createSelector((state: RootState) => state.auth.isSignedIn, isSignedIn => isSignedIn);

/** Selects sign in error. */
export const selectSignInError = createSelector((state: RootState) => state.auth.signInError, error => error);

/** Selects sign in error. */
export const selectSignUpError = createSelector((state: RootState) => state.auth.signUpError, error => error);
