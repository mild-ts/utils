# @mild-ts/utils


## Installation
```
npm i @mild-ts
```

### Examples
```ts
import { createSymbolRecord } from '@mild-ts/utils';

export const Tokens = createSymbolRecord('HealthAlertOption', 'SlackOption');

// Equal to 
export const Tokens = {
  HealthAlertOption: Symbol.for('HealthAlertOption'),
  SlackOption: Symbol.for('SlackOption'),
}
```