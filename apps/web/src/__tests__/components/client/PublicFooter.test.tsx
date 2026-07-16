import { render, screen } from '@testing-library/react';
import { PublicFooter } from '@/components/public/layouts/PublicFooter';

describe('PublicFooter Component', () => {
  it('renders the footer landmark with an accessible aria-label', () => {
    render(<PublicFooter />);

    // The <footer> element exposes an implicit contentinfo landmark.
    // DR-782: it must carry an accessible name so assistive tech can
    // distinguish the site footer from other landmarks on the page.
    const footer = screen.getByRole('contentinfo', { name: 'Site footer' });

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('aria-label', 'Site footer');
  });
});
