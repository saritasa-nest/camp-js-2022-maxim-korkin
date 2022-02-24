/**
 * Enum with FirebaseErrors which can occur during authentication.
 */
export enum FirebaseAuthErrors {
  WrongEmail = 'auth/user-not-found',

  WrongPassword = 'auth/wrong-password',

  TooManyLogInAttempts = 'auth/too-many-requests',

  WeakPassword = 'auth/weak-password',

  EmailAlreadyInUse = 'auth/email-already-in-use',
}
