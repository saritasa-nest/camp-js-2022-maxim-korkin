import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects sign in state. */
export const selectIsSignedIn = createSelector((state: RootState) => state.auth.isSignedIn, isSignedIn => isSignedIn);

/** Selects auth error. */
export const selectAuthError = createSelector((state: RootState) => state.auth.error, error => error);
