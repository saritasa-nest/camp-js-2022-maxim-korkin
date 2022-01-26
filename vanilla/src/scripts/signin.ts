import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import setFormStatus from '../utils/setFormMessage';

const signInForm: HTMLFormElement | null = document.querySelector('#signin-form');

if (signInForm) {
  signInForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const data: FormData = new FormData(signInForm);
    const email: string = data.get('signin-email') as string;
    const password: string = data.get('signin-password') as string;

    (async() => {
      await AuthService.signInUser(email, password)();
      signInForm.reset();
    })().catch((reason: FirebaseError) => {
      const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
      setFormStatus(signInForm, message);
    });
  });
}
