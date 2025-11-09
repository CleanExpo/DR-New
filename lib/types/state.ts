/**
 * State Management Types with Discriminated Unions
 *
 * Type-safe state management patterns for React and Next.js
 */

import type { DeepReadonly, DeepPartial } from './utils';

/**
 * Loading State (Discriminated Union)
 */
export type LoadingState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading'; progress?: number }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: E; retryable: boolean };

/**
 * Async State
 */
export interface AsyncState<T, E = Error> {
  data: T | null;
  loading: boolean;
  error: E | null;
  lastUpdated: number | null;
}

/**
 * Form State (Discriminated Union)
 */
export type FormState<T> =
  | { state: 'idle'; values: DeepPartial<T> }
  | { state: 'validating'; values: T }
  | { state: 'invalid'; values: T; errors: FormErrors<T> }
  | { state: 'submitting'; values: T }
  | { state: 'success'; values: T; timestamp: number }
  | { state: 'error'; values: T; error: string };

/**
 * Form Errors
 */
export type FormErrors<T> = {
  [K in keyof T]?: T[K] extends object
    ? FormErrors<T[K]>
    : string | string[];
};

/**
 * Field State
 */
export interface FieldState<T> {
  value: T;
  touched: boolean;
  dirty: boolean;
  error: string | null;
  validating: boolean;
}

/**
 * Validation Rules
 */
export type ValidationRule<T> =
  | RequiredRule
  | MinLengthRule
  | MaxLengthRule
  | PatternRule
  | CustomRule<T>;

export interface RequiredRule {
  type: 'required';
  message?: string;
}

export interface MinLengthRule {
  type: 'minLength';
  value: number;
  message?: string;
}

export interface MaxLengthRule {
  type: 'maxLength';
  value: number;
  message?: string;
}

export interface PatternRule {
  type: 'pattern';
  value: RegExp;
  message?: string;
}

export interface CustomRule<T> {
  type: 'custom';
  validate: (value: T) => boolean | Promise<boolean>;
  message?: string;
}

/**
 * Action Types (Discriminated Union Pattern)
 */
export type Action<T extends string = string, P = any> = {
  type: T;
  payload: P;
  meta?: {
    timestamp: number;
    requestId?: string;
  };
};

/**
 * Reducer Type
 */
export type Reducer<S, A extends Action> = (state: S, action: A) => S;

/**
 * Store Type
 */
export interface Store<S, A extends Action> {
  getState(): DeepReadonly<S>;
  dispatch(action: A): void;
  subscribe(listener: (state: S) => void): () => void;
}

/**
 * Middleware Type
 */
export type Middleware<S, A extends Action> = (
  store: Store<S, A>
) => (next: (action: A) => void) => (action: A) => void;

/**
 * Selector Type
 */
export type Selector<S, R> = (state: S) => R;

/**
 * Memoized Selector Type
 */
export interface MemoizedSelector<S, R> extends Selector<S, R> {
  recomputations(): number;
  resetRecomputations(): void;
}

/**
 * Context State Pattern
 */
export interface ContextState<T> {
  state: T;
  setState: (update: T | ((prev: T) => T)) => void;
}

/**
 * Modal State
 */
export type ModalState =
  | { open: false }
  | { open: true; content: React.ReactNode; options?: ModalOptions };

export interface ModalOptions {
  closable?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  onClose?: () => void;
}

/**
 * Notification State (Discriminated Union)
 */
export type NotificationState =
  | { type: 'info'; message: string; duration?: number }
  | { type: 'success'; message: string; duration?: number }
  | { type: 'warning'; message: string; duration?: number }
  | { type: 'error'; message: string; duration?: number; retryAction?: () => void };

/**
 * Theme State
 */
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  customColors?: Record<string, string>;
}

/**
 * Auth State (Discriminated Union)
 */
export type AuthState =
  | { authenticated: false; loading: boolean }
  | {
      authenticated: true;
      user: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'user' | 'contractor';
        permissions: string[];
      };
      token: string;
      expiresAt: number;
    };

/**
 * Pagination State
 */
export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Filter State
 */
export interface FilterState<T> {
  filters: Partial<T>;
  activeFilters: (keyof T)[];
}

/**
 * Sort State
 */
export interface SortState<T> {
  field: keyof T;
  direction: 'asc' | 'desc';
}

/**
 * Table State
 */
export interface TableState<T> {
  data: T[];
  loading: boolean;
  pagination: PaginationState;
  filters: FilterState<T>;
  sort: SortState<T>;
  selection: Set<string>;
}

/**
 * Wizard State
 */
export interface WizardState<T extends Record<string, any>> {
  currentStep: number;
  totalSteps: number;
  completed: Set<number>;
  data: DeepPartial<T>;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

/**
 * Upload State (Discriminated Union)
 */
export type UploadState =
  | { status: 'idle' }
  | { status: 'uploading'; progress: number; filename: string }
  | { status: 'success'; url: string; filename: string }
  | { status: 'error'; error: string; filename: string };

/**
 * WebSocket State (Discriminated Union)
 */
export type WebSocketState =
  | { status: 'disconnected' }
  | { status: 'connecting' }
  | { status: 'connected'; connectedAt: number }
  | { status: 'error'; error: string; retrying: boolean };

/**
 * Cache State
 */
export interface CacheState<T> {
  data: Map<string, { value: T; timestamp: number; ttl: number }>;
  hits: number;
  misses: number;
}

/**
 * Optimistic Update
 */
export interface OptimisticUpdate<T> {
  id: string;
  operation: 'create' | 'update' | 'delete';
  data: T;
  rollback: () => void;
}

/**
 * Undo/Redo State
 */
export interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

/**
 * Feature Flag State
 */
export type FeatureFlags = Record<string, boolean>;

/**
 * A/B Test State
 */
export interface ABTestState {
  variant: 'A' | 'B';
  assignedAt: number;
  converted: boolean;
}

/**
 * Geolocation State
 */
export type GeolocationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'success';
      coordinates: {
        latitude: number;
        longitude: number;
        accuracy: number;
      };
    }
  | { status: 'error'; error: GeolocationPositionError };

/**
 * Device State
 */
export interface DeviceState {
  type: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  online: boolean;
  touch: boolean;
}

/**
 * Scroll State
 */
export interface ScrollState {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
  isScrolling: boolean;
  reachedTop: boolean;
  reachedBottom: boolean;
}

/**
 * Media Query State
 */
export type MediaQueryState = Record<string, boolean>;

/**
 * Intersection Observer State
 */
export interface IntersectionState {
  isIntersecting: boolean;
  intersectionRatio: number;
  entry: IntersectionObserverEntry | null;
}
