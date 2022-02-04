import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './../../firebase/firebase';

onAuthStateChanged(auth, user => {
  if (user === null) {
    document.location = '/';
  } else {
    console.log('user is signed in');
  }
});
