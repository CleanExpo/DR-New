/**
 * Base Value Object Class
 *
 * Value objects are immutable and have no identity.
 * They are equal if all their properties are equal.
 *
 * @example
 * ```typescript
 * class Address extends ValueObject {
 *   constructor(
 *     public readonly street: string,
 *     public readonly city: string,
 *     public readonly postcode: string
 *   ) {
 *     super();
 *   }
 *
 *   protected getEqualityComponents(): unknown[] {
 *     return [this.street, this.city, this.postcode];
 *   }
 * }
 *
 * const addr1 = new Address('123 Main St', 'Brisbane', '4000');
 * const addr2 = new Address('123 Main St', 'Brisbane', '4000');
 * addr1.equals(addr2); // true
 * ```
 */

export abstract class ValueObject {
  /**
   * Return the components that determine equality
   * Override in subclasses
   */
  protected abstract getEqualityComponents(): unknown[];

  /**
   * Value objects are equal if all their properties are equal
   */
  equals(other: ValueObject): boolean {
    if (!other) return false;
    if (!(other instanceof ValueObject)) return false;
    if (this.constructor !== other.constructor) return false;

    const thisComponents = this.getEqualityComponents();
    const otherComponents = other.getEqualityComponents();

    if (thisComponents.length !== otherComponents.length) {
      return false;
    }

    return thisComponents.every((component, index) =>
      this.deepEquals(component, otherComponents[index])
    );
  }

  /**
   * Deep equality check for components
   */
  private deepEquals(a: unknown, b: unknown): boolean {
    // Same reference
    if (a === b) return true;

    // Both null or undefined
    if (a == null || b == null) return a === b;

    // Both are value objects
    if (a instanceof ValueObject && b instanceof ValueObject) {
      return a.equals(b);
    }

    // Both are arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => this.deepEquals(item, b[index]));
    }

    // Both are objects
    if (typeof a === 'object' && typeof b === 'object') {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      return aKeys.every(key =>
        this.deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
      );
    }

    // Primitive comparison
    return a === b;
  }

  /**
   * Create a string representation of this value object
   */
  toString(): string {
    const components = this.getEqualityComponents();
    return `${this.constructor.name}(${JSON.stringify(components)})`;
  }

  /**
   * Create a hash code for this value object
   * Useful for Maps and Sets
   */
  hashCode(): number {
    const components = this.getEqualityComponents();
    const str = JSON.stringify(components);
    return this.simpleHash(str);
  }

  /**
   * Simple hash function for strings
   */
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  /**
   * Clone this value object
   * Since value objects are immutable, return this instance
   */
  clone(): this {
    return this;
  }
}

/**
 * Helper type to ensure value object properties are readonly
 */
export type ValueObjectProps<T> = {
  readonly [K in keyof T]: T[K];
};
