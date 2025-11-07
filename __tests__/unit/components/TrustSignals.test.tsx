import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrustSignals from '@/components/trust/TrustSignals';

describe('TrustSignals Component', () => {
  it('renders trust signals section', () => {
    render(<TrustSignals />);
    expect(screen.getByText(/Master Restorer/i)).toBeInTheDocument();
  });

  it('displays Master Restorer certification prominently', () => {
    render(<TrustSignals />);
    const masterRestorerText = screen.getByText(/Master Restorer/i);
    expect(masterRestorerText).toBeInTheDocument();
  });

  it('shows industry certifications', () => {
    render(<TrustSignals />);
    expect(
      screen.getByText(/Certified/i) ||
      screen.getByText(/Qualified/i) ||
      screen.getByText(/Licensed/i)
    ).toBeInTheDocument();
  });

  it('includes insurance company affiliations', () => {
    render(<TrustSignals />);
    expect(
      screen.getByText(/Insurance/i) ||
      screen.getByText(/Approved/i)
    ).toBeInTheDocument();
  });

  it('displays trust badges or credentials', () => {
    const { container } = render(<TrustSignals />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('has accessible image alt text', () => {
    const { container } = render(<TrustSignals />);
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });
});
