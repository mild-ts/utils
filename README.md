# @thaitype/utils

Opinionated TypeScript Utility Libraries [@thaitype](https://github.com/mildronize/thaitype)

[![CI](https://github.com/mildronize/utils/actions/workflows/main.yml/badge.svg)](https://github.com/mildronize/utils/actions/workflows/main.yml)

## Installation
```
npm i @thaitype/utils
```

## Philosophy
npm packages is a hugh community, somethime, we don't know the npm package for our solution. We don't want to duplicate implementation of utility, if you found the alternative npm packages, please feel free to open issues, or PR ;). 

## Related Utils Library
- [just](https://github.com/angus-c/just) A library of dependency-free JavaScript utilities that do just one thing.
- [lodash](https://github.com/lodash/lodash) 

### Examples
```ts
import { createSymbolRecord } from '@thaitype/utils';

export const Tokens = createSymbolRecord('HealthAlertOption', 'SlackOption');

// Equal to 
export const Tokens = {
  HealthAlertOption: Symbol.for('HealthAlertOption'),
  SlackOption: Symbol.for('SlackOption'),
}
```