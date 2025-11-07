/**
 * Result Type - Railway-Oriented Programming
 *
 * A type-safe way to handle success and failure without throwing exceptions.
 * Forces explicit error handling at the call site.
 *
 * @example
 * ```typescript
 * function divide(a: number, b: number): Result<number> {
 *   if (b === 0) {
 *     return Result.fail(new DivisionByZeroError());
 *   }
 *   return Result.ok(a / b);
 * }
 *
 * const result = divide(10, 2);
 * if (result.success) {
 *   console.log(result.value); // 5
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */

export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

export class Result {
  /**
   * Creates a successful Result
   */
  static ok<T>(value: T): Result<T, never> {
    return { success: true, value };
  }

  /**
   * Creates a failed Result
   */
  static fail<E extends Error>(error: E): Result<never, E> {
    return { success: false, error };
  }

  /**
   * Combines multiple Results into one
   * Returns first error or all values if all succeed
   */
  static combine<T>(results: Result<T>[]): Result<T[]> {
    const values: T[] = [];

    for (const result of results) {
      if (!result.success) {
        return result;
      }
      values.push(result.value);
    }

    return Result.ok(values);
  }

  /**
   * Maps the value of a successful Result
   */
  static map<T, U>(result: Result<T>, fn: (value: T) => U): Result<U> {
    if (!result.success) {
      return result;
    }
    return Result.ok(fn(result.value));
  }

  /**
   * Chains Results together (flatMap)
   */
  static chain<T, U>(
    result: Result<T>,
    fn: (value: T) => Result<U>
  ): Result<U> {
    if (!result.success) {
      return result;
    }
    return fn(result.value);
  }

  /**
   * Executes side effect if Result is successful
   */
  static tap<T>(result: Result<T>, fn: (value: T) => void): Result<T> {
    if (result.success) {
      fn(result.value);
    }
    return result;
  }

  /**
   * Unwraps value or throws error
   * Use sparingly - prefer explicit error handling
   */
  static unwrap<T>(result: Result<T>): T {
    if (!result.success) {
      throw result.error;
    }
    return result.value;
  }

  /**
   * Unwraps value or returns default
   */
  static unwrapOr<T>(result: Result<T>, defaultValue: T): T {
    return result.success ? result.value : defaultValue;
  }

  /**
   * Converts a function that throws into one that returns Result
   */
  static fromThrowable<T, E extends Error = Error>(
    fn: () => T,
    errorFactory?: (error: unknown) => E
  ): Result<T, E> {
    try {
      return Result.ok(fn());
    } catch (error) {
      if (errorFactory) {
        return Result.fail(errorFactory(error));
      }
      return Result.fail(error as E);
    }
  }

  /**
   * Converts a Promise that throws into one that returns Result
   */
  static async fromPromise<T, E extends Error = Error>(
    promise: Promise<T>,
    errorFactory?: (error: unknown) => E
  ): Promise<Result<T, E>> {
    try {
      const value = await promise;
      return Result.ok(value);
    } catch (error) {
      if (errorFactory) {
        return Result.fail(errorFactory(error));
      }
      return Result.fail(error as E);
    }
  }
}

/**
 * Type guard to check if Result is successful
 */
export function isOk<T>(result: Result<T>): result is { success: true; value: T } {
  return result.success === true;
}

/**
 * Type guard to check if Result is failed
 */
export function isError<T>(result: Result<T>): result is { success: false; error: Error } {
  return result.success === false;
}
