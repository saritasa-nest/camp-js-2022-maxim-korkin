import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/auth.service';

interface AuthInfo {
  /** Email. */
  readonly email: string;
  /** Password. */
  readonly password: string;
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (authInfo: AuthInfo) => {
    await AuthService.signIn(authInfo.email, authInfo.password);
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authInfo: AuthInfo) => {
    await AuthService.signUp(authInfo.email, authInfo.password);
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    await AuthService.signOutUser();
  },
);
