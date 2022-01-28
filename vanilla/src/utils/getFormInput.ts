import { FormFields } from '../interfaces/FormFields';

import { setFormErrorMessage } from './setFormErrorMessage';

/**
 * Check email and password from the sign up or sign in form.
 * @param form - Form to be checked.
 * @returns Object with the email and password or null if input is incorrect.
 */
export function getFormInput(form: HTMLFormElement): FormFields | null {
  setFormErrorMessage(form, '');

  const data = new FormData(form);

  const email = data.get('email')?.toString();

  const password = data.get('password')?.toString();

  if (typeof email === 'string' && typeof password === 'string') {
    if (email.trim() === '') {
      const message = 'you have to provide an email';
      setFormErrorMessage(form, message);
      return null;
    } else if (password.trim() === '') {
      const message = 'wrong password';
      setFormErrorMessage(form, message);
      return null;
    }
    return {
      email,
      password,
    };
  }
  return null;
}
