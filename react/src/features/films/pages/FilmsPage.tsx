import { AppBar, Box, Button } from '@mui/material';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'src/store/auth/dispatchers';

const FilmsPageComponent: VFC = () => {
  const dispatch = useDispatch();

  const handleSignOut = (): void => {
    dispatch(signOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Button type="button" color="inherit" onClick={handleSignOut}>Sign Out</Button>
      </AppBar>
    </Box>
  );
};

export const FilmsPage = memo(FilmsPageComponent);
