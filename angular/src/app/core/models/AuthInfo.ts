/**
 * Interface with the fields required for authentication.
 */
export interface AuthInfo {

  /**
   * Email.
   */
  readonly email: string;

  /**
   * Password.
   */
  readonly password: string;
}
