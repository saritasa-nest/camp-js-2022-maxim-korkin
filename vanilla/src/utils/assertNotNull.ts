/**
 * Function for asserting that the value is not null or undefined.
 * @param value - Value to assert.
 * @throws - Error in case if value is null.
 */
export function assertNotNull<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || typeof value === 'undefined') {
    throw new Error('Unexpected null value.');
  }
}
