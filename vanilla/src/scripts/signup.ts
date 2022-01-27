import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import { closeModal } from '../utils/closeModal';

import { setFormErrorMessage } from '../utils/setFormErrorMessage';

const signUpForm: HTMLFormElement | null = document.querySelector('#signup-form');

if (signUpForm != null) {
  signUpForm.addEventListener('submit', async(event: Event) => {
    event.preventDefault();

    const data = new FormData(signUpForm);

    const email = data.get('signup-email')?.toString();

    const password = data.get('signup-password')?.toString();

    setFormErrorMessage(signUpForm, '');

    if (typeof email === 'string' && typeof password === 'string') {
      if (email.trim() === '') {
        const message = 'you have to provide an email';
        setFormErrorMessage(signUpForm, message);
      } else if (password.trim() === '') {
        const message = 'wrong password';
        setFormErrorMessage(signUpForm, message);
      } else {
        await AuthService.signUpUser(email, password).then(() => {
          signUpForm.reset();

          const signUpModal = document.querySelector('#signup');
          closeModal(signUpModal);
        })
          .catch((reason: FirebaseError) => {
          const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
          setFormErrorMessage(signUpForm, message);
        });
      }
    }
  });
}
