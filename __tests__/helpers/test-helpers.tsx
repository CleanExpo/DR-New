/**
 * Test Helpers and Utilities
 *
 * Common testing utilities, custom assertions, and helper functions.
 */

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

/**
 * Custom render function with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, { ...options });
}

/**
 * Wait for async operations to complete
 */
export const waitFor = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create mock fetch response
 */
export function createMockResponse<T>(data: T, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  } as Response;
}

/**
 * Mock Next.js router
 */
export function createMockRouter(overrides = {}) {
  return {
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    basePath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    ...overrides,
  };
}

/**
 * Mock window.matchMedia
 */
export function mockMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

/**
 * Mock IntersectionObserver
 */
export function mockIntersectionObserver() {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as any;
}

/**
 * Mock ResizeObserver
 */
export function mockResizeObserver() {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as any;
}

/**
 * Generate test phone number
 */
export const testPhoneNumber = (prefix = '04'): string => {
  const random = () => Math.floor(Math.random() * 10);
  return `${prefix}${random()}${random()} ${random()}${random()}${random()} ${random()}${random()}${random()}`;
};

/**
 * Generate test email
 */
export const testEmail = (domain = 'test.com'): string => {
  const random = Math.random().toString(36).substring(7);
  return `test.${random}@${domain}`;
};

/**
 * Generate test Brisbane address
 */
export const testAddress = (): string => {
  const streets = ['Smith St', 'Jones Ave', 'Brown Rd', 'Wilson Pde'];
  const suburbs = ['Hamilton', 'Ascot', 'New Farm', 'Toowong'];
  const num = Math.floor(Math.random() * 200) + 1;

  return `${num} ${streets[Math.floor(Math.random() * streets.length)]}, ${suburbs[Math.floor(Math.random() * suburbs.length)]}, QLD 4000`;
};

/**
 * Mock localStorage
 */
export function mockLocalStorage() {
  const store: { [key: string]: string } = {};

  const mockLocalStorage = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });

  return mockLocalStorage;
}

/**
 * Mock sessionStorage
 */
export function mockSessionStorage() {
  const store: { [key: string]: string } = {};

  const mockSessionStorage = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };

  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
    writable: true,
  });

  return mockSessionStorage;
}

/**
 * Create mock Next.js Image component
 */
export const MockNextImage = jest.fn(({ src, alt, ...props }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...props} />
));

/**
 * Setup common browser mocks
 */
export function setupBrowserMocks() {
  mockMatchMedia();
  mockIntersectionObserver();
  mockResizeObserver();
  mockLocalStorage();
  mockSessionStorage();
}

/**
 * Clean up after tests
 */
export function cleanupTests() {
  jest.clearAllMocks();
  jest.restoreAllMocks();
}

/**
 * Delay execution (for testing async behavior)
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Assert element has specific class
 */
export function assertHasClass(element: Element, className: string) {
  expect(element.classList.contains(className)).toBe(true);
}

/**
 * Assert element does not have specific class
 */
export function assertDoesNotHaveClass(element: Element, className: string) {
  expect(element.classList.contains(className)).toBe(false);
}

/**
 * Get by test ID (data-testid)
 */
export function getByTestId(container: HTMLElement, testId: string) {
  return container.querySelector(`[data-testid="${testId}"]`);
}

/**
 * Simulate form input
 */
export async function fillForm(form: HTMLFormElement, data: Record<string, string>) {
  for (const [name, value] of Object.entries(data)) {
    const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement;
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

/**
 * Wait for element to appear
 */
export async function waitForElement(
  container: HTMLElement,
  selector: string,
  timeout = 5000
): Promise<Element> {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const element = container.querySelector(selector);
    if (element) return element;
    await delay(100);
  }

  throw new Error(`Element ${selector} not found within ${timeout}ms`);
}

/**
 * Assert SEO meta tags
 */
export function assertMetaTags(document: Document, expectedTags: Record<string, string>) {
  for (const [property, content] of Object.entries(expectedTags)) {
    const metaTag = document.querySelector(`meta[property="${property}"]`) ||
                   document.querySelector(`meta[name="${property}"]`);

    expect(metaTag).toBeTruthy();
    expect(metaTag?.getAttribute('content')).toBe(content);
  }
}

/**
 * Assert structured data (JSON-LD)
 */
export function assertStructuredData(document: Document, expectedType: string) {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  const data = Array.from(scripts).map(s => JSON.parse(s.textContent || '{}'));

  const hasType = data.some(d => d['@type'] === expectedType);
  expect(hasType).toBe(true);
}

/**
 * Mock console methods
 */
export function mockConsole() {
  const originalConsole = { ...console };

  global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  };

  return {
    restore: () => {
      global.console = originalConsole;
    },
  };
}

export default {
  renderWithProviders,
  waitFor,
  createMockResponse,
  createMockRouter,
  mockMatchMedia,
  mockIntersectionObserver,
  mockResizeObserver,
  testPhoneNumber,
  testEmail,
  testAddress,
  mockLocalStorage,
  mockSessionStorage,
  setupBrowserMocks,
  cleanupTests,
  delay,
  assertHasClass,
  assertDoesNotHaveClass,
  getByTestId,
  fillForm,
  waitForElement,
  assertMetaTags,
  assertStructuredData,
  mockConsole,
};
