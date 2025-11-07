import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicePageLayout from '@/components/services/ServicePageLayout';

describe('ServicePageLayout Component', () => {
  const mockProps = {
    title: 'Water Damage Restoration',
    description: 'Professional water damage restoration services',
    heroImage: '/images/water-damage.webp',
    serviceType: 'water-damage',
  };

  it('renders service page with correct title', () => {
    render(<ServicePageLayout {...mockProps} />);
    expect(screen.getByText(/Water Damage Restoration/i)).toBeInTheDocument();
  });

  it('displays service description', () => {
    render(<ServicePageLayout {...mockProps} />);
    expect(screen.getByText(/Professional water damage restoration/i)).toBeInTheDocument();
  });

  it('includes emergency contact CTA', () => {
    render(<ServicePageLayout {...mockProps} />);
    const links = screen.getAllByRole('link');
    const emergencyLink = links.find(link =>
      link.textContent?.includes('24/7') ||
      link.textContent?.includes('Emergency')
    );
    expect(emergencyLink).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    const { container } = render(<ServicePageLayout {...mockProps} />);
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toContain('Water Damage Restoration');
  });

  it('includes schema markup for SEO', () => {
    const { container } = render(<ServicePageLayout {...mockProps} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });
});
