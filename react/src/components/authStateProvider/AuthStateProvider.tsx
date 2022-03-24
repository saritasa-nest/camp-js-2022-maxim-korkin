import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AuthService } from 'src/api/services/auth.service';
import { setSignIn } from 'src/store/auth/slice';

const AuthStateProviderComponent: VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => AuthService.subscribeToAuthStateChange(user => {
    dispatch(setSignIn(user !== null));
  }));

  return <Outlet />;
};

export const AuthStateProvider = memo(AuthStateProviderComponent);
