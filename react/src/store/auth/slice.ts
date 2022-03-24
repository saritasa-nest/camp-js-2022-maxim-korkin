import { createSlice } from '@reduxjs/toolkit';

import {
  signIn, signOut, signUp, getUserFromCache,
} from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(signIn.fulfilled, (state, action) => {
      state.isSignedIn = true;
      state.userInfo = action.payload;
      state.signInError = undefined;
    })
    .addCase(signIn.rejected, (state, action) => {
      if (action.error.message) {
        state.signInError = action.error.message;
      }
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isSignedIn = true;
      state.userInfo = action.payload;
      state.signUpError = undefined;
    })
    .addCase(signUp.rejected, (state, action) => {
      if (action.error.message) {
        state.signUpError = action.error.message;
      }
    })
    .addCase(signOut.fulfilled, state => {
      state.isSignedIn = false;
      state.userInfo = null;
    })
    .addCase(getUserFromCache.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.isSignedIn = true;
        state.userInfo = action.payload;
      } else {
        state.isSignedIn = false;
        state.userInfo = action.payload;
      }
    }),
});
