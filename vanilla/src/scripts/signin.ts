import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import setMessage from '../utils/setFormMessage';

const signInForm: HTMLFormElement | null = document.querySelector('#signin-form');

if (signInForm) {
  signInForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const data: FormData = new FormData(signInForm);
    const email: string = data.get('signin-email') as string;
    const password: string = data.get('signin-password') as string;

    (async() => {
      await AuthService.signInUser(email, password)();

      setMessage(signInForm, '');

      signInForm.reset();

      const signInModal: Element | null = document.querySelector('#signin');
      if (signInModal) {
        M.Modal.getInstance(signInModal).close();
      }
    })().catch((reason: FirebaseError) => {
      const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
      setMessage(signInForm, message);
    });
  });
}
