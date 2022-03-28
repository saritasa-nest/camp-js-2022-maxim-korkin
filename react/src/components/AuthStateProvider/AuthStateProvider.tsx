import { CircularProgress } from '@mui/material';
import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { getUserFromCache } from 'src/store/auth/dispatchers';
import { selectAuthIsLoadingFromCache } from 'src/store/auth/selectors';

const AuthStateProviderComponent: VFC = () => {
  const dispatch = useDispatch();

  const isLoading = useAppSelector(selectAuthIsLoadingFromCache);

  useEffect(() => {
    dispatch(getUserFromCache());
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <Outlet />;
};

export const AuthStateProvider = memo(AuthStateProviderComponent);
