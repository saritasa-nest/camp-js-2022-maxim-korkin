import { UserCredential } from 'firebase/auth';
import { UserInfo } from 'src/models/user';

export namespace UserMapper {
  /** Maps UserCredentials to UserInfo.
   * @param userCredential - User's credentials.
   */
  export function fromUserCredentials(userCredential: UserCredential): UserInfo {
    return {
      email: userCredential.user.email,
    };
  }
}
