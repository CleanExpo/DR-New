/**
 * Event Handling Utilities
 * Optimized event handlers with passive listeners, debounce, and throttle
 */

/**
 * Add passive event listener for better scroll performance
 */
export function addPassiveEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  const passiveOptions =
    typeof options === 'boolean'
      ? { passive: true, capture: options }
      : { passive: true, ...options };

  target.addEventListener(event, handler, passiveOptions);

  // Return cleanup function
  return () => {
    target.removeEventListener(event, handler, passiveOptions);
  };
}

/**
 * Debounced event handler
 */
export function debouncedEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  delayMs = 300,
  options?: boolean | AddEventListenerOptions
): () => void {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedHandler = (e: Event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      handler(e);
    }, delayMs);
  };

  target.addEventListener(event, debouncedHandler, options);

  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    target.removeEventListener(event, debouncedHandler, options);
  };
}

/**
 * Throttled event handler
 */
export function throttledEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  limitMs = 300,
  options?: boolean | AddEventListenerOptions
): () => void {
  let lastRun = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  const throttledHandler = (e: Event) => {
    const now = Date.now();

    if (now - lastRun >= limitMs) {
      lastRun = now;
      handler(e);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        lastRun = Date.now();
        handler(e);
      }, limitMs - (now - lastRun));
    }
  };

  target.addEventListener(event, throttledHandler, options);

  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    target.removeEventListener(event, throttledHandler, options);
  };
}

/**
 * Event delegation helper
 */
export function delegateEvent(
  target: EventTarget,
  event: string,
  selector: string,
  handler: (e: Event, el: Element) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  const delegatedHandler = (e: Event) => {
    const targetElement = e.target as Element;
    const delegateElement = targetElement.closest(selector);

    if (delegateElement) {
      handler(e, delegateElement);
    }
  };

  target.addEventListener(event, delegatedHandler, options);

  return () => {
    target.removeEventListener(event, delegatedHandler, options);
  };
}

/**
 * Intersection Observer wrapper
 */
export function observeIntersection(
  elements: Element | Element[],
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver(callback, options);

  const elementArray = Array.isArray(elements) ? elements : [elements];
  elementArray.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}

/**
 * Resize Observer wrapper
 */
export function observeResize(
  elements: Element | Element[],
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
): () => void {
  const observer = new ResizeObserver(callback);

  const elementArray = Array.isArray(elements) ? elements : [elements];
  elementArray.forEach((el) => observer.observe(el, options));

  return () => {
    observer.disconnect();
  };
}

/**
 * Mutation Observer wrapper
 */
export function observeMutations(
  target: Node,
  callback: MutationCallback,
  options?: MutationObserverInit
): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(target, options);

  return () => {
    observer.disconnect();
  };
}

/**
 * Custom event emitter
 */
export class EventEmitter<T extends Record<string, any> = Record<string, any>> {
  private events = new Map<keyof T, Set<Function>>();

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)!.add(handler);

    // Return unsubscribe function
    return () => this.off(event, handler);
  }

  off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  once<K extends keyof T>(event: K, handler: (data: T[K]) => void): () => void {
    const onceHandler = (data: T[K]) => {
      handler(data);
      this.off(event, onceHandler);
    };

    return this.on(event, onceHandler);
  }

  clear<K extends keyof T>(event?: K): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

/**
 * Scroll optimization utilities
 */
export class ScrollOptimizer {
  private ticking = false;
  private lastScrollY = 0;
  private handlers: Array<(scrollY: number, delta: number) => void> = [];

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
  }

  addHandler(handler: (scrollY: number, delta: number) => void): () => void {
    this.handlers.push(handler);

    if (this.handlers.length === 1) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    return () => {
      const index = this.handlers.indexOf(handler);
      if (index !== -1) {
        this.handlers.splice(index, 1);
      }

      if (this.handlers.length === 0) {
        window.removeEventListener('scroll', this.handleScroll);
      }
    };
  }

  private handleScroll(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const delta = scrollY - this.lastScrollY;

        this.handlers.forEach((handler) => handler(scrollY, delta));

        this.lastScrollY = scrollY;
        this.ticking = false;
      });

      this.ticking = true;
    }
  }
}

/**
 * Create optimized scroll listener
 */
export function onScroll(
  handler: (scrollY: number, delta: number) => void
): () => void {
  const optimizer = new ScrollOptimizer();
  return optimizer.addHandler(handler);
}
