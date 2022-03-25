import { AuthInfo } from 'src/models/AuthInfo';

/** Values of sign up form. */
export interface SignUpFormValues extends AuthInfo {
  /** Password repeat. */
  readonly repeatPassword: string;
}
