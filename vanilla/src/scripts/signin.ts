import { FirebaseError } from 'firebase/app';

import { AuthService } from '../services/AuthService';

import { getFormInput } from '../utils/getFormInput';
import { closeModal } from '../utils/closeModal';
import { setFormErrorMessage } from '../utils/setFormErrorMessage';

import { FormFields } from './../interfaces/FormFields';

const signInForm: HTMLFormElement | null = document.querySelector('#signin-form');

if (signInForm !== null) {
  signInForm.addEventListener('submit', async(event: Event) => {
    event.preventDefault();

    const formInput: FormFields | null = getFormInput(signInForm);

    if (formInput !== null) {
      await AuthService.signInUser(formInput.email, formInput.password).then(() => {
        signInForm.reset();

        const signInModal = document.querySelector('#signin');
        closeModal(signInModal);
      })
        .catch((reason: FirebaseError) => {
        const message = reason.code.replace('auth/', '').replaceAll('-', ' ');
        setFormErrorMessage(signInForm, message);
      });
    }
  });
}
