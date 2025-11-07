import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

export function ExternalLink(...args: any[]): void {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
    >
      {children}
      <ExternalLinkIcon className="h-3 w-3" />
    </a>
  );
}