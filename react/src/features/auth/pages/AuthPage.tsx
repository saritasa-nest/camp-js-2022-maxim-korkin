import { Breadcrumbs, Stack } from '@mui/material';
import { memo, VFC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthPageComponent: VFC = () => (
  <Stack alignItems="center">
    <Breadcrumbs role="presentation" aria-label="breadcrumb">
      <Link to="/auth/sign-in">Sign In</Link>
      <Link to="/auth/sign-up">Sign Up</Link>
    </Breadcrumbs>
    <Outlet />
  </Stack>
);

export const AuthPage = memo(AuthPageComponent);
