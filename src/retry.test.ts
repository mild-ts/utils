import test from 'ava';
import { Retry, retry } from './retry';

const retryInstance = new Retry({
  maxAttempts: 1,
  minSeconds: 0,
  maxSeconds: 1,
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
    throw new Error('error');
  };
  const error = await t.throwsAsync(() => retry(action, { retryInstance }));
  t.is(error?.message, 'error');
});
