import { memo, VFC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsSignedIn } from 'src/store/auth/selectors';

const SignedInOnlyGuardComponent: VFC = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};

export const SignedInOnlyGuard = memo(SignedInOnlyGuardComponent);
