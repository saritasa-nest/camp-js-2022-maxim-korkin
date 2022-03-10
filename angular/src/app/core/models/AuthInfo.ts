/**
 * Specifies fields which are used for signing in or up.
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
