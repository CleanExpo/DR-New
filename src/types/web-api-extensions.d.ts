/**
 * Web API Extensions
 * Type extensions for browser APIs
 */

// Extend FormData to include all standard methods
interface FormData {
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, fileName?: string): void;
  delete(name: string): void;
  append(name: string, value: string | Blob, fileName?: string): void;
  entries(): IterableIterator<[string, FormDataEntryValue]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<FormDataEntryValue>;
  forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}

// Extend CSSStyleDeclaration for fontDisplay property
interface CSSStyleDeclaration {
  fontDisplay: string;
}

// Extend Location for toLowerCase (likely a typo in the original code, but fixing for compatibility)
interface Location {
  toLowerCase?: () => string;
}

export {};
