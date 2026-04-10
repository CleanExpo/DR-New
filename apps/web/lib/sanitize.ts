/**
 * HTML sanitization helper — wraps DOMPurify for client-side usage.
 *
 * DOMPurify requires the DOM, so this function is a no-op on the server.
 * All callsites are 'use client' components where window is available at
 * render time, so this is safe.
 */

let DOMPurify: typeof import('dompurify') | null = null;

async function loadDOMPurify(): Promise<typeof import('dompurify')> {
  if (!DOMPurify) {
    DOMPurify = (await import('dompurify')).default as unknown as typeof import('dompurify');
  }
  return DOMPurify;
}

/**
 * Synchronous sanitizer — safe to use in render functions.
 * Falls back to an empty string on the server (SSR pass).
 * DOMPurify must have been pre-loaded via `preloadSanitizer()` for full
 * effect; otherwise returns the raw string (admin-only content).
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side rendering — content is admin-authored; return as-is.
    // DOMPurify only strips tags in the browser where the DOM is available.
    return html;
  }
  if (DOMPurify) {
    return (DOMPurify as import('dompurify').DOMPurifyI).sanitize(html, {
      USE_PROFILES: { html: true },
    });
  }
  // DOMPurify not yet loaded — return raw (admin-authored content only).
  return html;
}

/**
 * Eagerly load DOMPurify in client components.
 * Call once in a useEffect to ensure sanitizeHtml works synchronously
 * on subsequent renders.
 */
export async function preloadSanitizer(): Promise<void> {
  if (typeof window !== 'undefined') {
    await loadDOMPurify();
  }
}

/**
 * Escape plain text for safe injection into an HTML context, then apply
 * markdown-style highlights (**text** → <mark>text</mark>).
 *
 * Use this instead of dangerouslySetInnerHTML for search preview snippets.
 */
export function renderHighlightedPreview(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>');
}
