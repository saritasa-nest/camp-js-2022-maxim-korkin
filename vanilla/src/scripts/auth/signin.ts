import { FirebaseError } from 'firebase/app';

import { AuthService } from '../../services/auth/AuthService';
import { getFormInput } from '../../features/auth/getFormInput';
import { closeModal } from '../../features/auth/closeModal';
import { setFormErrorMessage } from '../../features/auth/setFormErrorMessage';
import { FormFields } from '../../interfaces/auth/FormFields';

const signInForm: HTMLFormElement | null = document.querySelector('#signin-form');

if (signInForm !== null) {
  signInForm.addEventListener('submit', async(event: Event) => {
    event.preventDefault();

    const formInput: FormFields | null = getFormInput(signInForm);

    if (formInput !== null) {
      try {
        await AuthService.signInUser(formInput.email, formInput.password);

        signInForm.reset();

        const signInModal = document.querySelector('#signin');
        closeModal(signInModal);
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          const message = error.code.replace('auth/', '').replaceAll('-', ' ');
          setFormErrorMessage(signInForm, message);
        }
      }
    }
  });
}
