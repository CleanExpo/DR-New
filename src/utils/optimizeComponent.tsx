/**
 * Component Optimization Utilities
 * Helpers for React.memo, useMemo, useCallback
 */

import { memo, useMemo, useCallback, ComponentType } from 'react';

/**
 * Deep comparison for React.memo
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {return true;}

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {return false;}

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Shallow comparison for React.memo (default)
 */
export function shallowEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {return false;}

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {return false;}
  }

  return true;
}

/**
 * Create memoized component with custom comparison
 */
export function createMemoComponent<P extends object>(
  Component: ComponentType<P>,
  compareFn: (prevProps: P, nextProps: P) => boolean = shallowEqual
) {
  return memo(Component, compareFn);
}

/**
 * useMemoized - Simplified useMemo with logging in development
 */
export function useMemoized<T>(
  factory: () => T,
  deps: React.DependencyList,
  label?: string
): T {
  if (process.env.NODE_ENV === 'development' && label) {
    console.log(`[useMemoized] Computing ${label}`, deps);
  }

  return useMemo(factory, deps);
}

/**
 * useCallbackMemoized - Simplified useCallback with logging
 */
export function useCallbackMemoized<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  label?: string
): T {
  if (process.env.NODE_ENV === 'development' && label) {
    console.log(`[useCallbackMemoized] Creating ${label}`, deps);
  }

  return useCallback(callback, deps);
}

/**
 * Optimization HOC - automatically memoize component
 */
export function withOptimization<P extends object>(
  Component: ComponentType<P>,
  displayName?: string
) {
  const MemoizedComponent = memo(Component);
  MemoizedComponent.displayName = displayName || Component.displayName || Component.name;
  return MemoizedComponent;
}

/**
 * Check if component should re-render
 */
export function shouldComponentUpdate<P extends object>(
  prevProps: P,
  nextProps: P,
  componentName?: string
): boolean {
  const shouldUpdate = !shallowEqual(prevProps, nextProps);

  if (process.env.NODE_ENV === 'development' && shouldUpdate && componentName) {
    const changedProps = Object.keys(nextProps).filter(
      (key) => (prevProps as any)[key] !== (nextProps as any)[key]
    );

    console.log(`[shouldComponentUpdate] ${componentName} will re-render`, {
      changedProps,
    });
  }

  return shouldUpdate;
}

/**
 * Example Usage:
 *
 * // 1. Memoize expensive component
 * const ExpensiveList = createMemoComponent(
 *   function ExpensiveList({ items }) {
 *     return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
 *   },
 *   (prevProps, nextProps) => {
 *     return prevProps.items.length === nextProps.items.length;
 *   }
 * );
 *
 * // 2. Use memoized values
 * const filtered = useMemoized(
 *   () => items.filter(item => item.active),
 *   [items],
 *   'filtered items'
 * );
 *
 * // 3. Use memoized callbacks
 * const handleClick = useCallbackMemoized(
 *   (id) => {
 *     console.log('Clicked:', id);
 *   },
 *   [],
 *   'handleClick'
 * );
 */

/**
 * Performance optimization checklist
 */
export const OPTIMIZATION_CHECKLIST = {
  memo: [
    '✅ Use React.memo for components that render often with same props',
    '✅ Use custom comparison function for complex props',
    '❌ Avoid memo for components that rarely re-render',
  ],
  useMemo: [
    '✅ Use for expensive calculations',
    '✅ Use for derived data from props/state',
    '❌ Avoid for simple operations (slower than recalculating)',
  ],
  useCallback: [
    '✅ Use for callbacks passed to memoized child components',
    '✅ Use for callbacks with expensive setup',
    '❌ Avoid for simple inline functions',
  ],
  general: [
    '✅ Keep component state as local as possible',
    '✅ Split large components into smaller ones',
    '✅ Use code splitting for large features',
    '✅ Lazy load off-screen content',
    '✅ Virtualize long lists',
  ],
};

/**
 * Print optimization checklist
 */
export function printOptimizationChecklist() {
  console.group('⚡ React Performance Optimization Checklist');

  Object.entries(OPTIMIZATION_CHECKLIST).forEach(([category, items]) => {
    console.group(`📋 ${category.toUpperCase()}`);
    items.forEach((item) => console.log(item));
    console.groupEnd();
  });

  console.groupEnd();
}
