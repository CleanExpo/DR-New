'use client';

import { useEffect } from 'react';

export default function AccessibilityHelper() {
  useEffect(() => {
    // Enhance keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with '1' key
      if (e.key === '1' && e.altKey) {
        const main = document.getElementById('main');
        if (main) {
          main.focus();
          main.scrollIntoView({ behaviour: 'smooth' });
        }
      }

      // Emergency call with 'c' key
      if (e.key === 'c' && e.altKey) {
        const phone = document.querySelector('[aria-label*="Call emergency"]') as HTMLElement;
        if (phone) {
          phone.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);

    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('[role="dialogue"]');

    if (modal) {
      const focusableContent = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0] as HTMLElement;
      const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }

        if (e.key === 'Escape') {
          const closeButton = modal.querySelector('[aria-label*="Close"]') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
        }
      });
    }

    // High contrast mode detection
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };

    mediaQuery.addEventListener('change', handleContrastChange);
    if (mediaQuery.matches) {
      document.body.classList.add('high-contrast');
    }

    // Reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);
    if (motionQuery.matches) {
      document.body.classList.add('reduce-motion');
    }

    // Ensure all images have alt text
    document.querySelectorAll('img:not([alt])').forEach((img) => {
      img.setAttribute('alt', '');
      console.warn('Image missing alt text:', img);
    });

    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      if (level > lastLevel + 1) {
        console.warn(`Heading hierarchy issue: ${heading.tagName} follows H${lastLevel}`);
      }
      lastLevel = level;
    });

    // Add focus indicators if missing
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 3px solid #0066cc;
        outline-offset: 2px;
      }

      .high-contrast *:focus-visible {
        outline: 3px solid currentColor;
      }

      .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --primary: #4da6ff;
          --danger: #ff6b6b;
          --success: #51cf66;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      mediaQuery.removeEventListener('change', handleContrastChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (announcer.parentNode) {
        announcer.parentNode.removeChild(announcer);
      }
    };
  }, []);

  return null;
}