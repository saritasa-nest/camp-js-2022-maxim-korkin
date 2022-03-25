import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects sign in state. */
export const selectIsSignedIn = createSelector(
  (state: RootState) => state.auth.userInfo,
  userInfo => userInfo !== null,
);

/** Selects sign in error. */
export const selectSignInError = createSelector((state: RootState) => state.auth.signInError, error => error);

/** Selects sign in error. */
export const selectSignUpError = createSelector((state: RootState) => state.auth.signUpError, error => error);

/** Selects auth isLoading state. */
export const selectAuthIsLoading = createSelector((state: RootState) => state.auth.isLoading, isLoading => isLoading);

/** Selects auth isLoadingFromCache state. */
export const selectAuthIsLoadingFromCache = createSelector(
  (state: RootState) => state.auth.isLoadingFromCache,
  isLoadingFromCache => isLoadingFromCache,
);
