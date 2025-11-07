import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays company contact information', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('includes service area information', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Brisbane/i) ||
      screen.getByText(/Ipswich/i) ||
      screen.getByText(/Logan/i)
    ).toBeInTheDocument();
  });

  it('contains copyright information', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('displays Master Restorer credentials', () => {
    render(<Footer />);
    expect(screen.getByText(/Master Restorer/i)).toBeInTheDocument();
  });

  it('has proper semantic footer structure', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
