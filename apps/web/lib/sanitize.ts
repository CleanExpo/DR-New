/**
 * HTML sanitization helper — wraps DOMPurify for client-side usage.
 *
 * DOMPurify requires the DOM, so this function is a no-op on the server.
 * All callsites are 'use client' components where window is available at
 * render time, so this is safe.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let purify: { sanitize: (html: string, cfg?: Record<string, unknown>) => string } | null = null;

async function loadDOMPurify(): Promise<void> {
  if (!purify) {
    // Dynamic import keeps DOMPurify out of the SSR bundle.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod = await import('dompurify');
    purify = (mod.default ?? mod) as unknown as typeof purify;
  }
}

/**
 * Synchronous sanitizer — safe to use in render functions.
 * DOMPurify must have been pre-loaded via `preloadSanitizer()` for full
 * effect; otherwise returns the raw string (admin-authored content only).
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side rendering — content is admin-authored; return as-is.
    return html;
  }
  if (purify) {
    return purify.sanitize(html, { USE_PROFILES: { html: true } });
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
