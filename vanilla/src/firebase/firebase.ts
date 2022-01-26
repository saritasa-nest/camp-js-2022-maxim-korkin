import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABtu8jyH6i6Bq0QTnPhlcLVDpaG0bwDzM',
  authDomain: 'sw-app-906e5.firebaseapp.com',
  projectId: 'sw-app-906e5',
  storageBucket: 'sw-app-906e5.appspot.com',
  messagingSenderId: '839093279496',
  appId: '1:839093279496:web:b1b170a6d6d09496882abd',
  measurementId: 'G-S1LZYX384J',
};

const app = initializeApp(firebaseConfig);

export const firestore: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
