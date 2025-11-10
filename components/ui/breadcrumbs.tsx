'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {return null;}

  // Auto-generate breadcrumbs if not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  // Generate Schema.org BreadcrumbList structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href && { item: `https://disasterrecovery.com.au${item.href}` })
    }))
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {/* Home link always first */}
            <li>
              <Link
                href="/"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                aria-label="Home"
              >
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Home</span>
              </Link>
            </li>

            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  {isLast ? (
                    // Current page - no link
                    <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
                      {item.name}
                    </span>
                  ) : (
                    // Linked breadcrumb
                    <Link
                      href={item.href!}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate max-w-[200px] sm:max-w-none"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Build breadcrumbs from URL segments
  segments.forEach((segment, index) => {
    const href = `/${  segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;

    // Format segment name
    const name = formatSegmentName(segment, segments, index);

    breadcrumbs.push({
      name,
      href: isLast ? undefined : href
    });
  });

  return breadcrumbs;
}

/**
 * Format URL segment into readable breadcrumb name
 */
function formatSegmentName(segment: string, segments: string[], index: number): string {
  // Special cases for common routes
  const specialCases: Record<string, string> = {
    // Services
    'services': 'Services',
    'water-damage': 'Water Damage',
    'water-damage-restoration': 'Water Damage Restoration',
    'fire-damage': 'Fire Damage',
    'fire-damage-restoration': 'Fire Damage Restoration',
    'mould-remediation': 'Mould Remediation',
    'mold-remediation': 'Mold Remediation',
    'storm-damage': 'Storm Damage',
    'storm-damage-restoration': 'Storm Damage Restoration',
    'flood-damage-restoration': 'Flood Damage Restoration',
    'flood-recovery': 'Flood Recovery',
    'emergency-services': 'Emergency Services',
    'emergency-response': 'Emergency Response',
    'commercial-services': 'Commercial Services',
    'commercial': 'Commercial Services',
    'biohazard': 'Biohazard Cleanup',
    'biohazard-cleanup': 'Biohazard Cleanup',
    'biohazard-cleaning': 'Biohazard Cleaning',
    'sewage-cleanup': 'Sewage Cleanup',
    'trauma-cleanup': 'Trauma Cleanup',
    'structural-drying': 'Structural Drying',
    'technical-assessment': 'Technical Assessment',
    'indoor-environmental-professional': 'Indoor Environmental Professional',
    'indoor-environmental-health': 'Indoor Environmental Health',

    // Specific services
    'burst-pipes': 'Burst Pipes',
    'burst-pipe-repair': 'Burst Pipe Repair',
    'emergency-water-extraction': 'Emergency Water Extraction',
    'smoke-odour-removal': 'Smoke Odour Removal',
    'soot-damage-cleanup': 'Soot Damage Cleanup',
    'black-mould-removal': 'Black Mould Removal',
    'bathroom-mould': 'Bathroom Mould',
    'ceiling-water-damage': 'Ceiling Water Damage',
    'roof-leak-damage': 'Roof Leak Damage',
    'hot-water-system-burst': 'Hot Water System Burst',
    'washing-machine-flooding': 'Washing Machine Flooding',
    'dishwasher-leaks': 'Dishwasher Leaks',
    'toilet-overflow': 'Toilet Overflow',
    'shower-leaks': 'Shower Leaks',

    // Emergency
    'emergency': 'Emergency',
    'after-hours': 'After Hours',
    'after-hours-emergency': 'After Hours Emergency',
    'weekend': 'Weekend',
    'weekend-emergency': 'Weekend Emergency',
    'public-holiday': 'Public Holiday',
    'public-holiday-emergency': 'Public Holiday Emergency',
    'christmas': 'Christmas',
    'christmas-emergency': 'Christmas Emergency',
    'new-year': 'New Year',
    'new-year-emergency': 'New Year Emergency',
    'easter': 'Easter',
    'anzac-day': 'ANZAC Day',
    'midnight': 'Midnight',
    'midnight-emergency': 'Midnight Emergency',
    'early-morning': 'Early Morning',
    'early-morning-emergency': 'Early Morning Emergency',
    'late-night': 'Late Night',
    'sunday-night-emergency': 'Sunday Night Emergency',

    // Checklists
    'checklists': 'Emergency Checklists',
    'general': 'General',

    // Locations
    'locations': 'Service Areas',
    'brisbane': 'Brisbane',
    'ipswich': 'Ipswich',
    'logan': 'Logan',
    'hamilton': 'Hamilton',
    'ascot': 'Ascot',
    'new-farm': 'New Farm',
    'toowong': 'Toowong',
    'paddington': 'Paddington',
    'bulimba': 'Bulimba',
    'karalee': 'Karalee',
    'brookwater': 'Brookwater',
    'springfield-lakes': 'Springfield Lakes',

    // Insurance
    'insurance': 'Insurance',
    'aami': 'AAMI',
    'allianz': 'Allianz',
    'anz-insurance': 'ANZ Insurance',
    'budget-direct': 'Budget Direct',
    'cgu': 'CGU',
    'coles-insurance': 'Coles Insurance',
    'comminsure': 'CommInsure',
    'gio': 'GIO',
    'nab-insurance': 'NAB Insurance',
    'nrma': 'NRMA',
    'qbe': 'QBE',
    'racq': 'RACQ',
    'racv': 'RACV',
    'suncorp': 'Suncorp',
    'vero': 'Vero',
    'westpac-insurance': 'Westpac Insurance',
    'woolworths-insurance': 'Woolworths Insurance',

    // Guides
    'guides': 'Guides',

    // FAQ
    'faq': 'FAQ',

    // Education
    'education': 'Education',
    'psychrometry': 'Psychrometry',
    'vapor-pressure': 'Vapor Pressure',
    'water-damage-classes': 'Water Damage Classes',
    'drying-science': 'Drying Science',

    // About
    'about': 'About',
    'team': 'Our Team',
    'certifications': 'Certifications',
    'iicrc': 'IICRC',

    // Other
    'contact': 'Contact',
    'emergency-guide': 'Emergency Guide',
    'get-help': 'Get Help',
    'cookies': 'Cookie Policy',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service'
  };

  if (specialCases[segment]) {
    return specialCases[segment];
  }

  // Context-aware formatting based on parent segments
  const parent = index > 0 ? segments[index - 1] : '';

  // Location-specific context
  if (parent === 'brisbane' || parent === 'ipswich' || parent === 'logan') {
    if (segment === 'water-damage') {return 'Water Damage';}
    if (segment === 'fire-damage') {return 'Fire Damage';}
    if (segment === 'emergency') {return 'Emergency Services';}
  }

  // Service type context
  if (parent === 'water-damage' || parent === 'fire-damage' || parent === 'mould-remediation') {
    // Keep as-is, format below
  }

  // Default: capitalize each word, replace hyphens with spaces
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
