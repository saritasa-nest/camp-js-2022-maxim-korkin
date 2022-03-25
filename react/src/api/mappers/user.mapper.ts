import { User, UserCredential } from 'firebase/auth';
import { UserInfo } from 'src/models/UserInfo';

export namespace UserCredentialsMapper {
  /**
   * Maps UserCredentials to UserInfo.
   * @param userCredential - User's credentials.
   */
  export function fromUserCredentials(userCredential: UserCredential): UserInfo {
    return {
      email: userCredential.user.email,
    };
  }

  /**
   * Maps Firebase's User to UserInfo.
   * @param dto - Dto.
   */
  export function fromUserDto(dto: User): UserInfo {
    return {
      email: dto.email,
    };
  }
}
