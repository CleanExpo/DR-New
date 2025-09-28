'use client';

import { ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  rel?: string;
}

export function ExternalLink({
  href,
  children,
  className = '',
  showIcon = true,
  rel = 'noopener noreferrer nofollow'
}: ExternalLinkProps) {
  // Track external link clicks for analytics
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'External Link',
        event_label: href,
        transport_type: 'beacon',
      });
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      onClick={handleClick}
      className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline transition-colors ${className}`}
      title={`External link to ${new URL(href).hostname}`}
    >
      {children}
      {showIcon && <ExternalLinkIcon className="w-3 h-3" />}
    </a>
  );
}