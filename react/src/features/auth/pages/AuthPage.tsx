import { Breadcrumbs, Stack } from '@mui/material';
import { memo, useEffect, VFC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsSignedIn } from 'src/store/auth/selectors';

const AuthPageComponent: VFC = () => {
  const navigate = useNavigate();
  const isSignedIn = useAppSelector(selectIsSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      navigate('/films');
    }
  }, [isSignedIn, navigate]);

  return (
    <Stack alignItems="center">
      <Breadcrumbs role="presentation" aria-label="breadcrumb">
        <Link
          to="/auth/sign-in"
        >
          Sign In
        </Link>
        <Link
          to="/auth/sign-up"
        >
          Sign Up
        </Link>
      </Breadcrumbs>
      <Outlet />
    </Stack>
  );
};

export const AuthPage = memo(AuthPageComponent);
