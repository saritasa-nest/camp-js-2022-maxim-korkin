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
      state.isLoading = false;
      state.userInfo = action.payload;
      state.signInError = undefined;
    })
    .addCase(signIn.pending, state => {
      state.isLoading = true;
    })
    .addCase(signIn.rejected, (state, action) => {
      if (action.error.message) {
        state.signInError = action.error.message;
        state.isLoading = false;
      }
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.signUpError = undefined;
    })
    .addCase(signUp.pending, state => {
      state.isLoading = true;
    })
    .addCase(signUp.rejected, (state, action) => {
      if (action.error.message) {
        state.signUpError = action.error.message;
        state.isLoading = false;
      }
    })
    .addCase(signOut.fulfilled, state => {
      state.userInfo = null;
    })
    .addCase(getUserFromCache.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.userInfo = action.payload;
        state.isLoading = false;
      } else {
        state.userInfo = action.payload;
        state.isLoading = false;
      }
    })
    .addCase(getUserFromCache.pending, state => {
      state.isLoading = true;
    }),
});
