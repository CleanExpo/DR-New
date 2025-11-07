/**
 * Navigation Optimization Component
 * Implements structured navigation with semantic HTML and SEO best practices
 */

import Link from 'next/link';

export interface NavItem {
  label: string;
  href: string;
  title?: string;
  children?: NavItem[];
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
  activePathname?: string;
}

/**
 * Main Navigation Component
 * Implements proper heading hierarchy and semantic navigation
 */
export function MainNavigation(...args: any[]): void {
  return (
    <nav className={className} aria-label="Main navigation">
      <ul className={`${className}__list`}>
        {items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isActive={activePathname === item.href}
            parentClass={className}
          />
        ))}
      </ul>
    </nav>
  );
}

/**
 * Navigation Item Component (recursive)
 */
function NavItem(...args: any[]): void {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className={`${parentClass}__item ${isActive ? 'active' : ''}`}>
      <Link
        href={item.href}
        className={`${parentClass}__link`}
        title={item.title || item.label}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
      {hasChildren && (
        <ul className={`${parentClass}__sublist`}>
          {item.children!.map((child) => (
            <NavItem
              key={child.href}
              item={child}
              isActive={isActive}
              parentClass={parentClass}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Footer Navigation Component
 * Organized by topic silos with proper hierarchy
 */
export function FooterNavigation(...args: any[]): void {
  const sections: Record<string, NavItem[]> = {
    'Services': [
      { label: 'Water Damage Restoration', href: '/services/water-damage' },
      { label: 'Fire Damage Restoration', href: '/services/fire-damage' },
      { label: 'Mould Remediation', href: '/services/mould-remediation' },
      { label: 'Storm Damage Restoration', href: '/services/storm-damage' },
      { label: 'Commercial Restoration', href: '/services/commercial' },
      { label: 'Emergency Response', href: '/services/emergency-services' }
    ],
    'Information': [
      { label: 'About Phill McGurk', href: '/about-phil-mcgurk' },
      { label: 'Service Areas', href: '/service-areas' },
      { label: 'Insurance Claims', href: '/insurance-claims' },
      { label: 'Emergency Guide', href: '/emergency-guide' },
      { label: 'FAQ', href: '/faq' }
    ],
    'Resources': [
      { label: 'Water Damage Guides', href: '/guides/water-damage' },
      { label: 'Fire Damage Guides', href: '/guides/fire-damage' },
      { label: 'Mould Prevention', href: '/guides/mould' },
      { label: 'Storm Damage Info', href: '/guides/storm-damage' }
    ],
    'Company': [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookies', href: '/cookies' }
    ]
  };

  return (
    <div className="footer-navigation">
      {Object.entries(sections).map(([title, items]) => (
        <div key={title} className="footer-navigation__section">
          <h3 className="footer-navigation__heading">{title}</h3>
          <ul className="footer-navigation__list">
            {items.map((item) => (
              <li key={item.href} className="footer-navigation__item">
                <Link
                  href={item.href}
                  className="footer-navigation__link"
                  title={item.title || item.label}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * Breadcrumb Navigation Component
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbNavigation(...args: any[]): void {
  return (
    <nav
      className={className}
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ul className={`${className}__list`}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`${className}__item`}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {item.href ? (
              <>
                <Link
                  href={item.href}
                  className={`${className}__link`}
                  itemProp="item"
                  title={item.label}
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              </>
            ) : (
              <span className={`${className}__current`} itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={(index + 1).toString()} />
            {item.href && <meta itemProp="item" content={item.href} />}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Service Category Navigation
 * Hierarchical navigation for service pages
 */
export function ServiceCategoryNav(...args: any[]): void {
  const categories: NavItem[] = [
    {
      label: 'Water Damage',
      href: '/services/water-damage',
      children: [
        { label: 'Burst Pipes', href: '/services/water-damage/burst-pipes' },
        { label: 'Ceiling Damage', href: '/services/water-damage/ceiling-water-damage' },
        { label: 'Roof Leaks', href: '/services/water-damage/roof-leak-damage' }
      ]
    },
    {
      label: 'Fire Damage',
      href: '/services/fire-damage',
      children: [
        { label: 'Smoke Odour Removal', href: '/services/fire-damage/smoke-odour-removal' },
        { label: 'Soot Cleanup', href: '/services/fire-damage/soot-damage-cleanup' },
        { label: 'Structural Repair', href: '/services/fire-damage/structural-fire-damage' }
      ]
    },
    {
      label: 'Mould Remediation',
      href: '/services/mould-remediation',
      children: [
        { label: 'Black Mould', href: '/services/mould-remediation/black-mould-removal' },
        { label: 'Bathroom Mould', href: '/services/mould-remediation/bathroom-mould' }
      ]
    },
    {
      label: 'Storm Damage',
      href: '/services/storm-damage',
      children: [
        { label: 'Cyclone Damage', href: '/services/storm-damage/cyclone-damage' },
        { label: 'Hail Damage', href: '/services/storm-damage/hail-damage-repair' }
      ]
    },
    {
      label: 'Commercial',
      href: '/services/commercial',
      children: [
        { label: 'Office Damage', href: '/services/commercial-services/office-water-damage' },
        { label: 'Retail Damage', href: '/services/commercial-services/retail-flood-damage' }
      ]
    }
  ];

  return (
    <nav className="service-nav" aria-label="Service categories">
      <ul className="service-nav__list">
        {categories.map((category) => (
          <li key={category.href} className="service-nav__item">
            <Link
              href={category.href}
              className="service-nav__link"
              title={`${category.label} restoration services`}
            >
              {category.label}
            </Link>
            {category.children && category.children.length > 0 && (
              <ul className="service-nav__sublist">
                {category.children.map((child) => (
                  <li key={child.href} className="service-nav__subitem">
                    <Link
                      href={child.href}
                      className="service-nav__sublink"
                      title={child.label}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Related Links Component
 * Shows contextual related content
 */
export function RelatedLinks(...args: any[]): void {
  if (!links || links.length === 0) return null;

  return (
    <section className={className}>
      <h2 className={`${className}__title`}>{title}</h2>
      <ul className={`${className}__list`}>
        {links.map((link) => (
          <li key={link.href} className={`${className}__item`}>
            <Link href={link.href} className={`${className}__link`} title={link.label}>
              {link.label}
            </Link>
            {link.description && (
              <p className={`${className}__description`}>{link.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default {
  MainNavigation,
  FooterNavigation,
  BreadcrumbNavigation,
  ServiceCategoryNav,
  RelatedLinks
};
