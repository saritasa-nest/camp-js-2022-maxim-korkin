import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import { setFormMessage } from '../utils/setFormMessage';

const signInForm: HTMLFormElement | null = document.querySelector('#signin-form');

if (signInForm != null) {
  signInForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const data: FormData = new FormData(signInForm);

    const email: string | undefined = data.get('signin-email')?.toString();

    const password: string | undefined = data.get('signin-password')?.toString();

    (async() => {
      setFormMessage(signInForm, '');

      if (typeof email === 'string' && typeof password === 'string') {
        if (email.trim() === '') {
          const message = 'you have to proide an email';
          setFormMessage(signInForm, message);
        } else if (password.trim() === '') {
          const message = 'wrong password';
          setFormMessage(signInForm, message);
        } else {
          await AuthService.signInUser(email, password)();

          signInForm.reset();

          const signInModal: Element | null = document.querySelector('#signin');
          if (signInModal != null) {
            M.Modal.getInstance(signInModal).close();
          }
        }
      }

    })().catch((reason: FirebaseError) => {
      const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
      setFormMessage(signInForm, message);
    });
  });
}
