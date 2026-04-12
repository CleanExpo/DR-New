'use client';

/**
 * SafeHtml — XSS-safe HTML renderer (RA-601)
 *
 * Wraps DOMPurify.sanitize() before injecting any HTML string into the DOM.
 * Use this component anywhere CMS or user-generated HTML content is rendered.
 * Never use dangerouslySetInnerHTML directly with external content.
 */

import { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const clean = useMemo(() => DOMPurify.sanitize(html), [html]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
