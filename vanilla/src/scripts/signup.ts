import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import { getFormInput } from '../utils/getFormInput';
import { closeModal } from '../utils/closeModal';
import { setFormErrorMessage } from '../utils/setFormErrorMessage';

import { FormFields } from './../interfaces/FormFields';

const signUpForm: HTMLFormElement | null = document.querySelector('#signup-form');

if (signUpForm !== null) {
  signUpForm.addEventListener('submit', async(event: Event) => {
    event.preventDefault();

    const formInput: FormFields | null = getFormInput(signUpForm);

    if (formInput !== null) {
      try {
        await AuthService.signUpUser(formInput.email, formInput.password);

        signUpForm.reset();

        const signUpModal = document.querySelector('#signup');
        closeModal(signUpModal);
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          const message = error.code.replace('auth/', '').replaceAll('-', ' ');
          setFormErrorMessage(signUpForm, message);
        }
      }
    }
  });
}
