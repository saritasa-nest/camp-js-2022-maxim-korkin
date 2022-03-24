import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUserFromCache } from 'src/store/auth/dispatchers';

const AuthStateProviderComponent: VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromCache());
  });

  return <Outlet />;
};

export const AuthStateProvider = memo(AuthStateProviderComponent);
