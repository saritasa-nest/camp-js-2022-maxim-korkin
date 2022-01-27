import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import { setFormMessage } from '../utils/setFormMessage';

const signUpForm: HTMLFormElement | null = document.querySelector('#signup-form');

if (signUpForm != null) {
  signUpForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const data: FormData = new FormData(signUpForm);

    const email: string | undefined = data.get('signup-email')?.toString();

    const password: string | undefined = data.get('signup-password')?.toString();

    (async() => {
      setFormMessage(signUpForm, '');

      if (typeof email === 'string' && typeof password === 'string') {
        if (email.trim() === '') {
          const message = 'you have to proide an email';
          setFormMessage(signUpForm, message);
        } else if (password.trim() === '') {
          const message = 'password cannot be empty or contain spaces only';
          setFormMessage(signUpForm, message);
        } else {
          await AuthService.signUpUser(email, password)();

          signUpForm.reset();

          const signUpModal: Element | null = document.querySelector('#signup');
          if (signUpModal != null) {
            M.Modal.getInstance(signUpModal).close();
          }
        }
      }
    })().catch((reason: FirebaseError) => {
      const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
      setFormMessage(signUpForm, message);
    });
  });
}
