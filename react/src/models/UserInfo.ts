/** User information. */
export interface UserInfo {
  /** Email of the user. Can be null since Firebase user doesn't necessarily contain an email. */
  readonly email: string | null;
}
