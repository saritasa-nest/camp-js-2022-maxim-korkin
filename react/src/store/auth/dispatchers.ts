import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/auth.service';
import { AuthInfo } from 'src/models/AuthInfo';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (authInfo: AuthInfo) => AuthService.signInUser(authInfo),
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authInfo: AuthInfo) => AuthService.signUpUser(authInfo),
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => AuthService.signOutUser(),
);

export const getUserFromCache = createAsyncThunk(
  'auth/subscribeToAuthStatus',
  async () => AuthService.getUser(),
);
