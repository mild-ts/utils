
/**
 * Delay for a number of seconds
 * @param seconds number of seconds to delay
 * @returns Promise<void>
 */
export async function delayInSeconds(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * Delay for a number of milliseconds
 * @param milliseconds number of milliseconds to delay
 * @returns Promise<void>
 */
export async function delayInMilliseconds(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Alias delayInMilliseconds as a delay
 */
/**
 * Delay for a number of milliseconds
 *
 * @note Alias delayInMilliseconds as a delay
 * @param milliseconds number of milliseconds to delay
 * @returns Promise<void>
 */
export const delay = delayInMilliseconds;
