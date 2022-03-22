import { memo, VFC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsSignedIn } from 'src/store/auth/selectors';

const SignedOutOnlyGuardComponent: VFC = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  if (isSignedIn) {
    return <Navigate to="/films" />;
  }

  return <Outlet />;
};

export const SignedOutOnlyGuard = memo(SignedOutOnlyGuardComponent);
