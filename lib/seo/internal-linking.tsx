// Automated Internal Linking System
// Creates intelligent cross-linking for maximum SEO value

import React from 'react';
import Link from 'next/link';
import { SuburbData, allSuburbs } from './suburb-data';
import { ServiceContent, SERVICES } from './content-generator';

interface InternalLink {
  href: string;
  text: string;
  title: string;
  priority: number;
}

// Generate contextual internal links based on content
export function generateInternalLinks(
  currentSuburb: SuburbData,
  currentService?: ServiceContent,
  limit: number = 10
): InternalLink[] {
  const links: InternalLink[] = [];

  // 1. Link to nearby suburbs with same service
  if (currentService) {
    currentSuburb.nearbySuburbs.slice(0, 3).forEach(nearby => {
      links.push({
        href: `/suburbs/${nearby.toLowerCase().replace(/\s+/g, '-')}/${currentService.service.toLowerCase().replace(/\s+/g, '-')}`,
        text: `${currentService.service} in ${nearby}`,
        title: `Get ${currentService.service.toLowerCase()} services in ${nearby}`,
        priority: 9
      });
    });
  }

  // 2. Link to other services in same suburb
  SERVICES.filter(s => s !== currentService).slice(0, 3).forEach(service => {
    links.push({
      href: `/suburbs/${currentSuburb.name.toLowerCase().replace(/\s+/g, '-')}/${service.service.toLowerCase().replace(/\s+/g, '-')}`,
      text: `${service.service} in ${currentSuburb.name}`,
      title: `${service.shortDesc}`,
      priority: 8
    });
  });

  // 3. Link to high-value suburbs
  const highValueSuburbs = allSuburbs
    .filter(s => s.demographics.averagePropertyValue > 1000000 && s !== currentSuburb)
    .sort((a, b) => b.demographics.averagePropertyValue - a.demographics.averagePropertyValue)
    .slice(0, 2);

  highValueSuburbs.forEach(suburb => {
    links.push({
      href: `/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`,
      text: `Services in ${suburb.name}`,
      title: `Premium disaster recovery services in ${suburb.name}`,
      priority: 7
    });
  });

  // 4. Link to emergency pages
  links.push({
    href: '/emergency/water-damage-emergency',
    text: '24/7 Emergency Water Damage',
    title: 'Get immediate help for water damage emergencies',
    priority: 10
  });

  // 5. Link to insurance pages
  if (currentSuburb.insuranceProviders.length > 0) {
    links.push({
      href: `/insurance/${currentSuburb.insuranceProviders[0].toLowerCase().replace(/\s+/g, '-')}`,
      text: `${currentSuburb.insuranceProviders[0]} Insurance Claims`,
      title: `We work with ${currentSuburb.insuranceProviders[0]} for direct billing`,
      priority: 6
    });
  }

  // 6. Link to comparison pages
  links.push({
    href: '/compare/diy-vs-professional',
    text: 'Why Professional Restoration Matters',
    title: 'Compare DIY vs professional disaster recovery',
    priority: 5
  });

  // 7. Link to cost pages
  links.push({
    href: `/cost/${currentSuburb.region.toLowerCase()}-${currentService?.service.toLowerCase().replace(/\s+/g, '-') || 'water-damage'}`,
    text: `${currentService?.service || 'Restoration'} Costs in ${currentSuburb.region}`,
    title: `Understanding restoration costs in ${currentSuburb.region}`,
    priority: 6
  });

  // Sort by priority and limit
  return links
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

// Internal Linking Component
interface InternalLinksProps {
  suburb: SuburbData;
  service?: ServiceContent;
  className?: string;
}

export function InternalLinks({ suburb, service, className = '' }: InternalLinksProps): React.ReactElement {
  const links = generateInternalLinks(suburb, service);

  return (
    <nav className={`internal-links ${className}`} aria-label="Related services and locations">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Related Services & Areas</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            title={link.title}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
          >
            <span className="text-blue-600 hover:text-blue-800 font-medium">
              {link.text}
            </span>
            <svg
              className="inline-block w-4 h-4 ml-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Breadcrumb Component for better navigation
interface BreadcrumbProps {
  suburb: SuburbData;
  service?: ServiceContent;
}

export function Breadcrumbs({ suburb, service }: BreadcrumbProps): React.ReactElement {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <Link href={`/${suburb.region.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
            {suburb.region}
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <Link
            href={`/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-gray-600 hover:text-gray-900"
          >
            {suburb.name}
          </Link>
        </li>
        {service && (
          <>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">{service.service}</li>
          </>
        )}
      </ol>
    </nav>
  );
}

// Footer Links Component - Comprehensive internal linking
export function FooterLinks(): React.ReactElement {
  // Group suburbs by region for organized footer
  const suburbsByRegion = {
    Brisbane: allSuburbs.filter(s => s.region === 'Brisbane'),
    Ipswich: allSuburbs.filter(s => s.region === 'Ipswich'),
    Logan: allSuburbs.filter(s => s.region === 'Logan')
  };

  return (
    <div className="footer-links bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Services Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Emergency Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(service => (
                <li key={service.service}>
                  <Link
                    href={`/services/${service.service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {service.service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brisbane Suburbs */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Brisbane Suburbs</h3>
            <ul className="space-y-2">
              {suburbsByRegion.Brisbane.slice(0, 8).map(suburb => (
                <li key={suburb.name}>
                  <Link
                    href={`/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {suburb.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ipswich Suburbs */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Ipswich Suburbs</h3>
            <ul className="space-y-2">
              {suburbsByRegion.Ipswich.map(suburb => (
                <li key={suburb.name}>
                  <Link
                    href={`/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {suburb.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logan Suburbs */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Logan Suburbs</h3>
            <ul className="space-y-2">
              {suburbsByRegion.Logan.map(suburb => (
                <li key={suburb.name}>
                  <Link
                    href={`/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {suburb.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h4 className="font-bold text-gray-900 mb-4">24/7 Disaster Recovery Services Across Brisbane, Ipswich & Logan</h4>
          <p className="text-sm text-gray-600 mb-4">
            As Brisbane's only Master Restorer certified company, we provide immediate response to water damage,
            fire damage, mould remediation, and storm damage across {allSuburbs.length} suburbs. Our IICRC-certified
            technicians arrive within 60 minutes, work directly with all major insurance companies including{' '}
            {Array.from(new Set(allSuburbs.flatMap(s => s.insuranceProviders))).slice(0, 5).join(', ')},
            and guarantee complete restoration to pre-loss condition.
          </p>
          <p className="text-sm text-gray-600">
            Servicing high-risk flood areas including{' '}
            {allSuburbs.filter(s => s.disasterRisk.floodRisk === 'high').slice(0, 3).map(s => s.name).join(', ')},
            storm-prone regions like{' '}
            {allSuburbs.filter(s => s.disasterRisk.stormRisk === 'high').slice(0, 3).map(s => s.name).join(', ')},
            and premium properties in{' '}
            {allSuburbs.filter(s => s.demographics.averagePropertyValue > 1500000).slice(0, 3).map(s => s.name).join(', ')}.
            With $20M insurance coverage and 24/7/365 availability, we're the trusted choice for{' '}
            {allSuburbs.reduce((sum, s) => sum + s.population, 0).toLocaleString()} residents across Southeast Queensland.
          </p>
        </div>
      </div>
    </div>
  );
}

// Generate topic clusters for content hubs
export function generateTopicClusters(suburb: SuburbData): any {
  const clusters = {
    'Water Damage Hub': {
      pillar: `/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}/water-damage-restoration`,
      spokes: [
        'Burst Pipe Emergency Response',
        'Flood Damage Recovery',
        'Basement Water Extraction',
        'Ceiling Water Damage',
        'Hardwood Floor Water Damage',
        'Carpet Water Damage'
      ]
    },
    'Mould Prevention Hub': {
      pillar: `/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}/mould-remediation`,
      spokes: [
        'Black Mould Removal',
        'Bathroom Mould Treatment',
        'Attic Mould Remediation',
        'Crawl Space Mould',
        'HVAC Mould Cleaning',
        'Post-Flood Mould Prevention'
      ]
    },
    'Insurance Claims Hub': {
      pillar: `/insurance-claims`,
      spokes: suburb.insuranceProviders.map(provider =>
        `${provider} Claim Process`
      )
    },
    'Emergency Response Hub': {
      pillar: `/emergency`,
      spokes: [
        '24/7 Water Damage Emergency',
        'Fire Damage Emergency Response',
        'Storm Damage Emergency',
        'Sewage Backup Emergency',
        'Biohazard Emergency Cleanup'
      ]
    }
  };

  return clusters;
}

// Smart anchor text generator for natural internal linking
export function generateAnchorText(
  targetUrl: string,
  context: 'service' | 'location' | 'emergency' | 'cost'
): string[] {
  const anchorVariations: string[] = [];

  switch (context) {
    case 'service':
      anchorVariations.push(
        'professional restoration services',
        'certified technicians',
        'emergency response team',
        'restoration experts',
        'IICRC certified professionals'
      );
      break;
    case 'location':
      anchorVariations.push(
        'local disaster recovery',
        'nearby restoration services',
        'area coverage',
        'service areas',
        'surrounding suburbs'
      );
      break;
    case 'emergency':
      anchorVariations.push(
        '24/7 emergency response',
        'immediate assistance',
        'urgent help available',
        'call now for help',
        'get help immediately'
      );
      break;
    case 'cost':
      anchorVariations.push(
        'restoration costs',
        'pricing information',
        'free quotes',
        'insurance coverage',
        'cost estimates'
      );
      break;
  }

  return anchorVariations;
}