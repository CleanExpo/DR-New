import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmergencyCTA from '@/components/EmergencyCTA';

describe('EmergencyCTA Component', () => {
  it('renders emergency CTA with correct text', () => {
    render(<EmergencyCTA />);
    expect(screen.getByText(/24\/7 Emergency Response/i)).toBeInTheDocument();
  });

  it('displays emergency phone number', () => {
    render(<EmergencyCTA />);
    const phoneLinks = screen.getAllByRole('link');
    const emergencyPhoneLink = phoneLinks.find(link =>
      link.getAttribute('href')?.includes('tel:')
    );
    expect(emergencyPhoneLink).toBeInTheDocument();
  });

  it('has proper aria labels for accessibility', () => {
    render(<EmergencyCTA />);
    const ctaButton = screen.getByRole('link', { name: /emergency/i });
    expect(ctaButton).toHaveAttribute('aria-label');
  });

  it('renders with high visibility styling', () => {
    const { container } = render(<EmergencyCTA />);
    const emergencyElement = container.querySelector('[class*="emergency"]');
    expect(emergencyElement).toBeInTheDocument();
  });

  it('is clickable and navigates to emergency contact', () => {
    render(<EmergencyCTA />);
    const phoneLinks = screen.getAllByRole('link');
    const emergencyPhoneLink = phoneLinks.find(link =>
      link.getAttribute('href')?.includes('tel:')
    );
    expect(emergencyPhoneLink).toHaveAttribute('href');
  });
});
