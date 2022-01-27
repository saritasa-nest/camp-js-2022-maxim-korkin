import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebase';

import { changeNavBarOnSignIn } from './changeNavBarOnSignIn';

import { changeNavBarOnSignOut } from './changeNavBarOnSignOut';

/**
 * Method for changing the page when the user signs in or out.
 */
export function startObservingUserActions(): void {
  onAuthStateChanged(auth, user => {
    if (user?.email) {
        changeNavBarOnSignIn(user.email);
    } else {
      changeNavBarOnSignOut();
    }
  });
}
