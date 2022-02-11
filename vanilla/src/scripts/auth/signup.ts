import { FirebaseError } from 'firebase/app';

import { AuthService } from '../../services/auth/AuthService';
import { getFormInput } from '../../features/auth/getFormInput';
import { closeModal } from '../../features/auth/closeModal';
import { setFormErrorMessage } from '../../features/auth/setFormErrorMessage';
import { FormFields } from '../../interfaces/auth/FormFields';

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
