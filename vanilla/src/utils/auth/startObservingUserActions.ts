import { onAuthStateChanged, Unsubscribe } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

import { changeNavBarOnSignIn } from '../auth/changeNavBarOnSignIn';

import { changeNavBarOnSignOut } from '../auth/changeNavBarOnSignOut';

/**
 * Method for changing the page when the user signs in or out.
 */
export function startObservingUserActions(): Unsubscribe {
  return onAuthStateChanged(auth, user => {
    if (user?.email) {
        changeNavBarOnSignIn(user.email);
    } else {
      changeNavBarOnSignOut();
    }
  });
}
