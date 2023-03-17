
export type TupleToObjectSymbol<T extends readonly string[]> = {
  [K in T[number]]: ReturnType<typeof Symbol.for>;
}

export function createSymbolRecord<const T extends readonly string[]>(...keys: T): TupleToObjectSymbol<T>{
  return keys.reduce((result: any, v: string) => {
    result[v] = Symbol.for(v);
    return result;
  }, {});
}