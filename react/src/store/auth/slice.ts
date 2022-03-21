import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { signIn, signOut, signUp } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(signIn.fulfilled, state => {
      state.isSignedIn = true;
      state.error = undefined;
    })
    .addCase(signIn.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    })
    .addCase(signUp.fulfilled, state => {
      state.isSignedIn = true;
      state.error = undefined;
    })
    .addCase(signUp.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    })
    .addCase(signOut.fulfilled, state => {
      state.isSignedIn = false;
    }),
});

export const { setSignIn } = authSlice.actions;
