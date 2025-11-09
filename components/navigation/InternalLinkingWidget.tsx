import Link from 'next/link';
import { getRelatedLinks } from '@/lib/internal-linking-hub';

interface InternalLinkingWidgetProps {
  currentUrl: string;
  title?: string;
  maxLinks?: number;
  className?: string;
}

export const InternalLinkingWidget: React.FC<InternalLinkingWidgetProps> = ({
  currentUrl,
  title = 'Related Services',
  maxLinks = 5,
  className = ''
}) => {
  const relatedLinks = getRelatedLinks(currentUrl, maxLinks);

  if (relatedLinks.length === 0) return null;

  return (
    <div className={`r6-glass-card p-6 rounded-lg ${className}`}>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {title}
      </h3>
      <ul className="space-y-3">
        {relatedLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.url}
              className="flex items-center text-gray-300 hover:text-electric-blue transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 text-electric-blue group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="group-hover:underline">{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternalLinkingWidget;
