import { AppBar, Button } from '@mui/material';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'src/store/auth/dispatchers';

const NavBarComponent: VFC = () => {
  const dispatch = useDispatch();

  const handleSignOut = (): void => {
    dispatch(signOut());
  };

  return (
    <AppBar position="static">
      <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
    </AppBar>
  );
};

export const NavBar = memo(NavBarComponent);
