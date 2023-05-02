import test from 'ava';
import { Retry, retry } from './retry';

const retryInstance = new Retry({
  maxAttempts: 2,
  minSeconds: 0,
  maxSeconds: 1,
  verbose: false,
});

test('test retry', async t => {
  const action = async () => {
    return 'hello';
  };
  const result = await retry(action);
  t.is(result, 'hello');
});

test('test retry with error', async t => {
  const action = async () => {
    console.log(`Start action`);
    throw new Error('error');
  };
  const error = await t.throwsAsync(() => retry(action, { retryInstance }));
  t.is(error?.message, 'error');
});
