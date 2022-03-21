import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectIsSignedIn = createSelector((state: RootState) => state.auth.isSignedIn, isSignedIn => isSignedIn);

export const selectAuthError = createSelector((state: RootState) => state.auth.error, error => error);
