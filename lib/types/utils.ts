/**
 * Advanced TypeScript Utility Types
 *
 * Generic utility types for advanced type manipulation
 */

/**
 * Deep Partial - Makes all properties optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Deep Readonly - Makes all properties readonly recursively
 */
export type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
  : T;

/**
 * Deep Required - Makes all properties required recursively
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * Mutable - Removes readonly from all properties
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * DeepMutable - Removes readonly from all properties recursively
 */
export type DeepMutable<T> = T extends object
  ? {
      -readonly [P in keyof T]: DeepMutable<T[P]>;
    }
  : T;

/**
 * Nullable - Makes type nullable
 */
export type Nullable<T> = T | null;

/**
 * Optional - Makes type optional (undefined)
 */
export type Optional<T> = T | undefined;

/**
 * NonNullableKeys - Get keys that are not nullable
 */
export type NonNullableKeys<T> = {
  [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? K : never;
}[keyof T];

/**
 * NullableKeys - Get keys that are nullable
 */
export type NullableKeys<T> = {
  [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? never : K;
}[keyof T];

/**
 * PickByType - Pick properties of a specific type
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * OmitByType - Omit properties of a specific type
 */
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

/**
 * RequiredKeys - Get keys that are required
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * OptionalKeys - Get keys that are optional
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * PickRequired - Pick only required properties
 */
export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

/**
 * PickOptional - Pick only optional properties
 */
export type PickOptional<T> = Pick<T, OptionalKeys<T>>;

/**
 * Exact - Ensures no extra properties
 */
export type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never;

/**
 * ValueOf - Get union of all property values
 */
export type ValueOf<T> = T[keyof T];

/**
 * Entries - Get array of [key, value] tuples
 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * UnionToIntersection - Convert union to intersection
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * UnionToTuple - Convert union to tuple
 */
export type UnionToTuple<T> = UnionToIntersection<
  T extends any ? (t: T) => T : never
> extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

/**
 * PromiseType - Extract the resolved type of a Promise
 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

/**
 * ArrayElement - Get the element type of an array
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * FunctionArgs - Get function argument types as tuple
 */
export type FunctionArgs<T> = T extends (...args: infer A) => any ? A : never;

/**
 * FunctionReturn - Get function return type
 */
export type FunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Constructor - Constructor type
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * Abstract Constructor
 */
export type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;

/**
 * Merge - Merge two types (right overrides left)
 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * DeepMerge - Recursively merge two types
 */
export type DeepMerge<T, U> = T extends object
  ? U extends object
    ? {
        [K in keyof T | keyof U]: K extends keyof U
          ? K extends keyof T
            ? DeepMerge<T[K], U[K]>
            : U[K]
          : K extends keyof T
          ? T[K]
          : never;
      }
    : U
  : U;

/**
 * Overwrite - Overwrite properties in T with properties from U
 */
export type Overwrite<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K];
};

/**
 * StringKeys - Get string keys only
 */
export type StringKeys<T> = Extract<keyof T, string>;

/**
 * NumberKeys - Get number keys only
 */
export type NumberKeys<T> = Extract<keyof T, number>;

/**
 * SymbolKeys - Get symbol keys only
 */
export type SymbolKeys<T> = Extract<keyof T, symbol>;

/**
 * Flatten - Flatten nested object one level
 */
export type Flatten<T> = T extends object
  ? { [K in keyof T]: T[K] }
  : T;

/**
 * DeepFlatten - Flatten all nested objects
 */
export type DeepFlatten<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? DeepFlatten<T[K]>
        : T[K];
    }
  : T;

/**
 * NonEmptyArray - Array with at least one element
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * AtLeastOne - Require at least one property
 */
export type AtLeastOne<T, Keys extends keyof T = keyof T> = Partial<T> &
  {
    [K in Keys]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
  }[Keys];

/**
 * ExactlyOne - Require exactly one property
 */
export type ExactlyOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]: Required<Pick<T, K>> &
    Partial<Record<Exclude<Keys, K>, never>>;
}[Keys];

/**
 * Primitive types
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/**
 * Falsy - All falsy values
 */
export type Falsy = false | 0 | '' | null | undefined;

/**
 * JSON types
 */
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONArray
  | JSONObject;

export interface JSONArray extends Array<JSONValue> {}

export interface JSONObject {
  [key: string]: JSONValue;
}

/**
 * Pretty - Improve type display in IDE
 */
export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * IfEquals - Conditional type for equality check
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends <T>() => T extends Y ? 1 : 2
  ? A
  : B;

/**
 * WritableKeys - Get keys that are writable (not readonly)
 */
export type WritableKeys<T> = {
  [K in keyof T]-?: IfEquals<
    { [Q in K]: T[K] },
    { -readonly [Q in K]: T[K] },
    K,
    never
  >;
}[keyof T];

/**
 * ReadonlyKeys - Get keys that are readonly
 */
export type ReadonlyKeys<T> = {
  [K in keyof T]-?: IfEquals<
    { [Q in K]: T[K] },
    { -readonly [Q in K]: T[K] },
    never,
    K
  >;
}[keyof T];

/**
 * PartialBy - Make specific keys optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * RequiredBy - Make specific keys required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Awaited - Extract type from Promise (built-in in TS 4.5+)
 */
export type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

/**
 * DeepAwait - Recursively await all promises
 */
export type DeepAwaited<T> = T extends Promise<infer U>
  ? DeepAwaited<U>
  : T extends object
  ? { [K in keyof T]: DeepAwaited<T[K]> }
  : T;
