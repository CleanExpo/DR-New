import Link from 'next/link';
import { getBreadcrumbPath } from '@/lib/internal-linking-hub';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';

interface BreadcrumbsProps {
  currentUrl: string;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentUrl,
  className = ''
}) => {
  const breadcrumbs = getBreadcrumbPath(currentUrl);

  if (breadcrumbs.length <= 1) return null;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <nav
        aria-label="Breadcrumb"
        className={`py-4 px-6 ${className}`}
      >
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-400" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.url}
                  className="text-electric-blue hover:text-blue-400 hover:underline transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
