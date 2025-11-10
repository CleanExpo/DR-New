/**
 * JSX Extensions
 * Custom JSX elements and extensions
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      email: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
