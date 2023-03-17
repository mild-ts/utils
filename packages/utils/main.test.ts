import test from 'ava';
import { createSymbolRecord } from './main';

test('test createSymbolRecord', t => {
  const expected = {
    HealthAlertOption: Symbol.for('HealthAlertOption'),
    SlackOption: Symbol.for('SlackOption'),
  };
  t.deepEqual(createSymbolRecord('HealthAlertOption', 'SlackOption'), expected);
});
