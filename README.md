# mild-ts
Opinionated TypeScript Utility Libraries


- [retry-helper](https://github.com/actions/checkout/blob/ac593985615ec2ede58e132d2e21d2b1cbd6127c/src/retry-helper.ts)
- ConsoleLogger

```ts
// https://pawelgrzybek.com/make-the-typescript-interface-partially-optional-required/
export type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

```ts
// https://github.com/colinhacks/zod/blob/master/src/index.ts
import * as mod from "./external";
export * from "./external";
export { mod as z };
export default mod;
```

```ts
// import { createSymbolRecord } from '@mild-ts/constant';

type TupleToObjectSymbol<T extends readonly string[]> = {
  [K in T[number]]: ReturnType<typeof Symbol.for>;
}

function createSymbolRecord<const T extends readonly string[]>(...keys: T): TupleToObjectSymbol<T>{
  return keys.reduce((result: any, v: string) => {
    result[v] = Symbol.for(v);
    return result;
  }, {});
}

export const Tokens = createSymbolRecord('HealthAlertOption', 'SlackOption');

// Equal to 
export const Tokens = {
  HealthAlertOption: Symbol.for('HealthAlertOption'),
  SlackOption: Symbol.for('SlackOption'),
}
```