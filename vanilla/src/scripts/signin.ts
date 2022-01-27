import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import { closeModal } from '../utils/closeModal';

import { setFormErrorMessage } from '../utils/setFormErrorMessage';

const signInForm: HTMLFormElement | null = document.querySelector('#signin-form');

if (signInForm != null) {
  signInForm.addEventListener('submit', async(event: Event) => {
    event.preventDefault();

    const data = new FormData(signInForm);

    const email = data.get('signin-email')?.toString();

    const password = data.get('signin-password')?.toString();

    setFormErrorMessage(signInForm, '');

    if (typeof email === 'string' && typeof password === 'string') {
      if (email.trim() === '') {
        const message = 'you have to provide an email';
        setFormErrorMessage(signInForm, message);
      } else if (password.trim() === '') {
        const message = 'wrong password';
        setFormErrorMessage(signInForm, message);
      } else {
        await AuthService.signInUser(email, password).then(() => {
          signInForm.reset();

          const signInModal = document.querySelector('#signin');
          closeModal(signInModal);
        })
          .catch((reason: FirebaseError) => {
          const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
          setFormErrorMessage(signInForm, message);
        });
      }
    }
  });
}
