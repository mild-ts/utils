// Ref: https://github.com/actions/checkout/blob/ac593985615ec2ede58e132d2e21d2b1cbd6127c/src/retry-helper.ts

import { delayInSeconds } from './delay';
import { randomInt } from './random';

const defaultMaxAttempts = 3;
const defaultMinSeconds = 10;
const defaultMaxSeconds = 20;

interface RetryOption {
  maxAttempts: number;
  minSeconds: number;
  maxSeconds: number;
  logger: (...args: any[]) => void;
  retryInstance: Retry;
  verbose: boolean;
  debug: boolean;
}

export class Retry implements RetryOption {
  readonly maxAttempts: number;
  readonly minSeconds: number;
  readonly maxSeconds: number;
  readonly logger: (...args: any[]) => void;
  readonly retryInstance: Retry;
  readonly verbose: boolean;
  readonly debug: boolean;

  constructor(option?: Partial<RetryOption>) {
    option = option ?? {};
    this.maxAttempts = option.maxAttempts ?? defaultMaxAttempts;
    this.minSeconds = option.minSeconds !== undefined ? Math.floor(option.minSeconds) : defaultMinSeconds;
    this.maxSeconds = option.maxSeconds !== undefined ? Math.floor(option.maxSeconds) : defaultMaxSeconds;
    this.logger = option.logger ?? console.log;
    this.verbose = option.verbose ?? true;
    this.debug = option.debug ?? false;
    this.retryInstance = option.retryInstance ?? this;

    const { minSeconds, maxSeconds, maxAttempts } = this.retryInstance;
    if (minSeconds > maxSeconds) {
      throw new Error(`min (${minSeconds}) seconds should be less than or equal to max (${maxSeconds}) seconds`);
    }
    this.retryInstance.log(
      `Initial Retry Helper with min=${minSeconds}, max=${maxSeconds}, maxAttempts=${maxAttempts}`
    );
  }

  async execute<T>(action: () => Promise<T>): Promise<T> {
    let attempt = 1;
    while (attempt < this.retryInstance.maxAttempts) {
      // Try
      try {
        return await action();
      } catch (err: unknown) {
        if(err instanceof Error){
          this.retryInstance.log(`Retry attempt ${attempt} failed with error: ${err.message}`);
        }
        this.retryInstance.debugLog(err);
      }

      // Sleep
      const seconds = randomInt(this.retryInstance.minSeconds, this.retryInstance.maxSeconds);
      this.retryInstance.log(`Waiting ${seconds} seconds before trying again, (attempt ${attempt})`);
      await delayInSeconds(seconds);
      attempt++;
    }

    // Last attempt
    return await action();
  }

  protected log(...arg: any[]) {
    if (this.retryInstance.verbose)
      this.retryInstance.logger(...arg);
  }

  protected debugLog(...arg: any[]) {
    if (this.retryInstance.debug)
      this.retryInstance.logger(...arg);
  }
}

/**
 * Retry helper function
 * @param action Async function
 * @param option Retry Option
 * @returns Promise of action
 */
export function retry<T>(action: () => Promise<T>, option?: Partial<RetryOption>): Promise<T> {
  const retry = new Retry(option as RetryOption);
  return retry.execute(action);
}
