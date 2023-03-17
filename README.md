# @mild-ts/utils

Opinionated TypeScript Utility Libraries [@mild-ts](https://github.com/mildronize/mild-ts)

[![CI](https://github.com/mildronize/utils/actions/workflows/main.yml/badge.svg)](https://github.com/mildronize/utils/actions/workflows/main.yml)

## Installation
```
npm i @mild-ts/utils
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