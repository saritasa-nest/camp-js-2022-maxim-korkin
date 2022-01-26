import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import setMessage from '../utils/setFormMessage';

const signUpForm: HTMLFormElement | null = document.querySelector('#signup-form');

if (signUpForm) {
  signUpForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const data: FormData = new FormData(signUpForm);
    const email: string = data.get('signup-email') as string;
    const password: string = data.get('signup-password') as string;

    (async() => {
      await AuthService.signUpUser(email, password)();

      setMessage(signUpForm, '');

      signUpForm.reset();

      const signUpModal: Element | null = document.querySelector('#signup');
      if (signUpModal) {
        M.Modal.getInstance(signUpModal).close();
      }

      const signInModal: Element | null = document.querySelector('#signin');
      if (signInModal) {
        M.Modal.getInstance(signInModal).open();
      }
    })().catch((reason: FirebaseError) => {
      const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
      setMessage(signUpForm, message);
    });

  });
}
