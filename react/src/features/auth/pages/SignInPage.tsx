import { Stack } from '@mui/material';
import { memo, VFC } from 'react';
import { SignInForm } from '../components/SignInForm';

const SignInPageComponent: VFC = () => (
  <Stack alignItems="center">
    <SignInForm />
  </Stack>
);

export const SignInPage = memo(SignInPageComponent);
