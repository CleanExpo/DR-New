/**
 * Shim for @storybook/react — provides minimal type stubs for TypeScript compilation.
 * The real package is only needed at Storybook dev server runtime.
 */
import type { ComponentType } from 'react';

export type Meta<T = any> = {
  title?: string;
  component?: ComponentType<T>;
  decorators?: any[];
  parameters?: Record<string, any>;
  args?: Partial<T>;
  argTypes?: Partial<Record<keyof T, any>>;
  tags?: string[];
};

export type StoryObj<T = any> = {
  args?: Partial<T>;
  parameters?: Record<string, any>;
  decorators?: any[];
  render?: (args: T) => any;
  play?: (context: any) => Promise<void> | void;
};
