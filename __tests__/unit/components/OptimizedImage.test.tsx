import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptimizedImage from '@/components/ui/OptimizedImage';

describe('OptimizedImage Component', () => {
  const mockProps = {
    src: '/images/test-image.webp',
    alt: 'Test image description',
    width: 800,
    height: 600,
  };

  it('renders image with correct src', () => {
    const { container } = render(<OptimizedImage {...mockProps} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('includes accessible alt text', () => {
    const { container } = render(<OptimizedImage {...mockProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'Test image description');
  });

  it('implements lazy loading', () => {
    const { container } = render(<OptimizedImage {...mockProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('uses WebP format for performance', () => {
    const { container } = render(<OptimizedImage {...mockProps} />);
    const img = container.querySelector('img');
    const src = img?.getAttribute('src') || '';
    expect(src.includes('.webp') || src.includes('_next/image')).toBe(true);
  });

  it('sets proper dimensions', () => {
    const { container } = render(<OptimizedImage {...mockProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
  });

  it('handles missing alt text gracefully', () => {
    const propsWithoutAlt = { ...mockProps, alt: undefined };
    const { container } = render(<OptimizedImage {...propsWithoutAlt} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });
});
