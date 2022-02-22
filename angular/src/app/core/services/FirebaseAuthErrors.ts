/**
 * Enum with FirebaseErrors which can occur during authentication.
 */
export enum FirebaseAuthErrors {
  WrongEmail = 'auth/user-not-found',

  WrongPassword = 'auth/wrong-password',

  TooManyLogInAttempts = 'auth/too-many-requests',
}
