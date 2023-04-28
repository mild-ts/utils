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
}

export class Retry {
  private option: RetryOption;
  constructor(option: Partial<RetryOption>) {
    this.option = (option ?? {}) as RetryOption;
    this.option.maxAttempts = option.maxAttempts ?? defaultMaxAttempts;
    this.option.minSeconds = option.minSeconds ? Math.floor(option.minSeconds) : defaultMinSeconds;
    this.option.maxSeconds = option.maxSeconds ? Math.floor(option.maxSeconds) : defaultMaxSeconds;
    this.option.logger = option.logger ?? console.log;
    const { minSeconds, maxSeconds, maxAttempts } = this.option;
    if (minSeconds > maxSeconds) {
      throw new Error('min seconds should be less than or equal to max seconds');
    }
    this.option.logger(`Init Retry Helper with min=${minSeconds}, max=${maxSeconds}, maxAttempts=${maxAttempts}`);
  }

  async execute<T>(action: () => Promise<T>): Promise<T> {
    let attempt = 1;
    while (attempt < this.option.maxAttempts) {
      // Try
      try {
        return await action();
      } catch (err) {
        this.option.logger((err as any)?.message);
      }

      // Sleep
      const seconds = randomInt(this.option.minSeconds, this.option.maxSeconds);
      this.option.logger(`Waiting ${seconds} seconds before trying again, (attempt ${attempt})`);
      await delayInSeconds(seconds);
      attempt++;
    }

    // Last attempt
    return await action();
  }
}
