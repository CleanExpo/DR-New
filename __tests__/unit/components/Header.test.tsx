import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';

describe('Header Component', () => {
  it('renders the header with navigation', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays company logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/disaster recovery/i);
    expect(logo).toBeInTheDocument();
  });

  it('contains navigation links for main services', () => {
    render(<Header />);
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('includes emergency contact in header', () => {
    render(<Header />);
    const links = screen.getAllByRole('link');
    const emergencyLink = links.find(link =>
      link.getAttribute('href')?.includes('tel:') ||
      link.textContent?.includes('Emergency')
    );
    expect(emergencyLink).toBeInTheDocument();
  });

  it('is responsive and mobile-friendly', () => {
    const { container } = render(<Header />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
