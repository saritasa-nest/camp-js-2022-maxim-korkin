import { AppBar, Box, Button } from '@mui/material';
import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { signOut } from 'src/store/auth/dispatchers';
import { selectIsSignedIn } from 'src/store/auth/selectors';

const FilmsPageComponent: VFC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignedIn = useAppSelector(selectIsSignedIn);

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/auth/sign-in');
    }
  }, [isSignedIn, navigate]);

  const handleSignOut = (): void => {
    dispatch(signOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
      </AppBar>
    </Box>
  );
};

export const FilmsPage = memo(FilmsPageComponent);
