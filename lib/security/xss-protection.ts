/**
 * XSS Protection Enhancement
 * Additional XSS protection utilities beyond DOMPurify
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Detect potential XSS attempts
 */
export function detectXSS(input: string): {
  suspicious: boolean;
  patterns: string[];
} {
  const xssPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=\s*["']?[^"'>]*/gi,
    /<iframe[\s\S]*?>/gi,
    /<embed[\s\S]*?>/gi,
    /<object[\s\S]*?>/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
    /<img[\s\S]*?onerror[\s\S]*?>/gi,
    /<svg[\s\S]*?onload[\s\S]*?>/gi,
  ];

  const detectedPatterns: string[] = [];

  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      detectedPatterns.push(pattern.source);
    }
  }

  return {
    suspicious: detectedPatterns.length > 0,
    patterns: detectedPatterns,
  };
}

/**
 * Strict HTML sanitization (no tags allowed)
 */
export function sanitizeStrict(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize with safe HTML tags only
 */
export function sanitizeSafeHTML(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span', 'a'],
    ALLOWED_ATTR: ['href', 'class'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style', 'link', 'base'],
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover'],
  });
}

/**
 * Sanitize markdown content
 */
export function sanitizeMarkdown(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'b', 'i', 'em', 'strong', 'code', 'pre',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style', 'link', 'base', 'form', 'input'],
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur'],
  });
}

/**
 * Encode HTML entities
 */
export function encodeHTML(input: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;

  if (div) {
    div.textContent = input;
    return div.innerHTML;
  }

  // Server-side fallback
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Decode HTML entities
 */
export function decodeHTML(input: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;

  if (div) {
    div.innerHTML = input;
    return div.textContent || div.innerText || '';
  }

  // Server-side fallback
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export function sanitizeURL(url: string): string {
  const trimmed = url.trim().toLowerCase();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];

  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      return '';
    }
  }

  // Only allow http, https, and mailto
  if (!trimmed.match(/^(https?:\/\/|mailto:|\/)/)) {
    return '';
  }

  return url;
}

/**
 * Sanitize CSS to prevent expression() and other attacks
 */
export function sanitizeCSS(css: string): string {
  // Remove dangerous CSS properties
  const sanitized = css
    .replace(/expression\s*\(/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/@import/gi, '')
    .replace(/behavior:/gi, '')
    .replace(/-moz-binding:/gi, '');

  return sanitized;
}

/**
 * Sanitize JSON to prevent prototype pollution
 */
export function sanitizeJSON(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeJSON(item));
  }

  const sanitized: any = {};
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  for (const [key, value] of Object.entries(obj)) {
    if (dangerousKeys.includes(key)) {
      continue; // Skip dangerous keys
    }

    // Sanitize string values
    if (typeof value === 'string') {
      sanitized[key] = sanitizeStrict(value);
    } else {
      sanitized[key] = sanitizeJSON(value);
    }
  }

  return sanitized;
}

/**
 * Content Security Policy helper
 */
export function generateCSPNonce(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for Node.js
  const { randomBytes } = require('crypto');
  return randomBytes(16).toString('base64');
}

/**
 * Validate and sanitize HTML attributes
 */
export function sanitizeAttribute(name: string, value: string): string {
  const dangerousAttributes = ['onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur'];

  if (dangerousAttributes.includes(name.toLowerCase())) {
    return '';
  }

  if (name.toLowerCase() === 'href' || name.toLowerCase() === 'src') {
    return sanitizeURL(value);
  }

  if (name.toLowerCase() === 'style') {
    return sanitizeCSS(value);
  }

  return sanitizeStrict(value);
}

/**
 * Safe innerHTML replacement
 */
export function setSafeInnerHTML(element: HTMLElement, html: string): void {
  const sanitized = sanitizeSafeHTML(html);
  element.innerHTML = sanitized;
}

/**
 * XSS protection middleware
 */
export function xssProtectionMiddleware(input: any): {
  safe: boolean;
  sanitized: any;
  threats: string[];
} {
  if (typeof input === 'string') {
    const { suspicious, patterns } = detectXSS(input);

    return {
      safe: !suspicious,
      sanitized: suspicious ? sanitizeStrict(input) : input,
      threats: patterns,
    };
  }

  if (typeof input === 'object' && input !== null) {
    return {
      safe: true,
      sanitized: sanitizeJSON(input),
      threats: [],
    };
  }

  return {
    safe: true,
    sanitized: input,
    threats: [],
  };
}
