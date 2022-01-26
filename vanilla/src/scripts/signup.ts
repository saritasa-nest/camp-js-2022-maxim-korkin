import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import setStatus from '../utils/setFormMessage';

const signUpForm: HTMLFormElement | null = document.querySelector('#signup-form');

if (signUpForm) {
  signUpForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const data: FormData = new FormData(signUpForm);
    const email: string = data.get('signup-email') as string;
    const password: string = data.get('signup-password') as string;

    (async() => {
      await AuthService.signUpUser(email, password)();
      signUpForm.reset();
    })().catch((reason: FirebaseError) => {
      const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
      setStatus(signUpForm, message);
    });

  });
}
