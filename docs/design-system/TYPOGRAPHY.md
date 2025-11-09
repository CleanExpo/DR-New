# Typography System - Disaster Recovery Brisbane

## Overview
Our typography system uses a modular scale (1.250 - Major Third) for harmonious sizing and professional hierarchy.

## Font Families

### Sans-Serif (Body)
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```
**Usage:** Body text, UI elements, forms

**Features:**
- Excellent readability at small sizes
- Professional and modern
- Optimized for digital screens
- Variable font with multiple weights

### Display (Headings)
```css
--font-display: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
**Usage:** Headings, hero text, display text

**Features:**
- Strong visual impact
- Geometric and friendly
- Excellent for large sizes
- Clear hierarchy

### Monospace (Code)
```css
--font-mono: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
```
**Usage:** Code snippets, technical content

## Type Scale

### Font Sizes (Modular Scale 1.250)
```css
--text-xs: 0.75rem;      /* 12px - Captions, labels */
--text-sm: 0.875rem;     /* 14px - Small text, metadata */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Lead paragraphs */
--text-xl: 1.25rem;      /* 20px - Subheadings */
--text-2xl: 1.5rem;      /* 24px - H4 */
--text-3xl: 1.875rem;    /* 30px - H3 */
--text-4xl: 2.25rem;     /* 36px - H2 */
--text-5xl: 3rem;        /* 48px - H1 */
--text-6xl: 3.75rem;     /* 60px - Hero text */
--text-7xl: 4.5rem;      /* 72px - Display XL */
--text-8xl: 6rem;        /* 96px - Display XXL */
--text-9xl: 8rem;        /* 128px - Display XXXL */
```

## Font Weights

```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;      /* Body text */
--font-medium: 500;      /* Emphasis */
--font-semibold: 600;    /* Subheadings, buttons */
--font-bold: 700;        /* Headings */
--font-extrabold: 800;   /* Strong emphasis */
--font-black: 900;       /* Maximum impact */
```

## Line Heights

```css
--leading-none: 1;        /* Tight display text */
--leading-tight: 1.25;    /* Headings */
--leading-snug: 1.375;    /* Subheadings */
--leading-normal: 1.5;    /* Body text (optimal) */
--leading-relaxed: 1.625; /* Comfortable reading */
--leading-loose: 2;       /* Spacious */
```

## Letter Spacing

```css
--tracking-tighter: -0.05em;  /* Large display text */
--tracking-tight: -0.025em;   /* Headings */
--tracking-normal: 0;         /* Body text */
--tracking-wide: 0.025em;     /* Buttons, labels */
--tracking-wider: 0.05em;     /* All caps text */
--tracking-widest: 0.1em;     /* Loose spacing */
```

## Typographic Hierarchy

### Display Styles

#### Hero Display (Homepage)
```css
font-family: var(--font-display);
font-size: var(--text-6xl);    /* 60px */
font-weight: var(--font-black); /* 900 */
line-height: var(--leading-tight);
letter-spacing: var(--tracking-tighter);
color: var(--color-neutral-900);
```
**Usage:** Homepage hero section

#### Display XL
```css
font-family: var(--font-display);
font-size: var(--text-5xl);    /* 48px */
font-weight: var(--font-bold);
line-height: var(--leading-tight);
letter-spacing: var(--tracking-tight);
```
**Usage:** Page titles, major sections

### Heading Styles

#### H1
```css
font-family: var(--font-display);
font-size: var(--text-5xl);    /* 48px */
font-weight: var(--font-bold);
line-height: var(--leading-tight);
color: var(--color-neutral-900);
```

#### H2
```css
font-family: var(--font-display);
font-size: var(--text-4xl);    /* 36px */
font-weight: var(--font-bold);
line-height: var(--leading-tight);
color: var(--color-neutral-900);
```

#### H3
```css
font-family: var(--font-display);
font-size: var(--text-3xl);    /* 30px */
font-weight: var(--font-semibold);
line-height: var(--leading-snug);
color: var(--color-neutral-900);
```

#### H4
```css
font-family: var(--font-display);
font-size: var(--text-2xl);    /* 24px */
font-weight: var(--font-semibold);
line-height: var(--leading-snug);
color: var(--color-neutral-800);
```

#### H5
```css
font-family: var(--font-sans);
font-size: var(--text-xl);     /* 20px */
font-weight: var(--font-semibold);
line-height: var(--leading-snug);
color: var(--color-neutral-800);
```

#### H6
```css
font-family: var(--font-sans);
font-size: var(--text-lg);     /* 18px */
font-weight: var(--font-semibold);
line-height: var(--leading-normal);
color: var(--color-neutral-700);
```

### Body Styles

#### Lead Paragraph
```css
font-family: var(--font-sans);
font-size: var(--text-lg);     /* 18px */
font-weight: var(--font-normal);
line-height: var(--leading-relaxed);
color: var(--color-neutral-700);
```
**Usage:** Introduction paragraphs, important content

#### Body
```css
font-family: var(--font-sans);
font-size: var(--text-base);   /* 16px */
font-weight: var(--font-normal);
line-height: var(--leading-normal);
color: var(--color-neutral-700);
```
**Usage:** Standard body text

#### Body Small
```css
font-family: var(--font-sans);
font-size: var(--text-sm);     /* 14px */
font-weight: var(--font-normal);
line-height: var(--leading-normal);
color: var(--color-neutral-600);
```
**Usage:** Secondary information, captions

#### Caption
```css
font-family: var(--font-sans);
font-size: var(--text-xs);     /* 12px */
font-weight: var(--font-medium);
line-height: var(--leading-normal);
color: var(--color-neutral-500);
```
**Usage:** Image captions, footnotes, metadata

### UI Text Styles

#### Button
```css
font-family: var(--font-sans);
font-size: var(--text-base);   /* 16px */
font-weight: var(--font-semibold);
line-height: var(--leading-none);
letter-spacing: var(--tracking-wide);
```

#### Label
```css
font-family: var(--font-sans);
font-size: var(--text-sm);     /* 14px */
font-weight: var(--font-semibold);
line-height: var(--leading-normal);
color: var(--color-neutral-900);
```

#### Input
```css
font-family: var(--font-sans);
font-size: var(--text-base);   /* 16px */
font-weight: var(--font-normal);
line-height: var(--leading-normal);
```
**Note:** Minimum 16px to prevent iOS zoom on focus

#### Helper Text
```css
font-family: var(--font-sans);
font-size: var(--text-sm);     /* 14px */
font-weight: var(--font-normal);
line-height: var(--leading-normal);
color: var(--color-neutral-600);
```

### Special Styles

#### Emergency CTA
```css
font-family: var(--font-display);
font-size: var(--text-xl);     /* 20px */
font-weight: var(--font-bold);
line-height: var(--leading-tight);
letter-spacing: var(--tracking-wide);
text-transform: uppercase;
```

#### Overline
```css
font-family: var(--font-sans);
font-size: var(--text-xs);     /* 12px */
font-weight: var(--font-bold);
line-height: var(--leading-normal);
letter-spacing: var(--tracking-widest);
text-transform: uppercase;
color: var(--color-neutral-500);
```
**Usage:** Section labels, categories

#### Link
```css
font-family: inherit;
font-size: inherit;
font-weight: inherit;
line-height: inherit;
color: var(--color-primary-600);
text-decoration: underline;
text-underline-offset: 2px;
```

## Responsive Typography

### Mobile (< 768px)
```css
--text-5xl: 2.25rem;  /* H1: 36px */
--text-4xl: 1.875rem; /* H2: 30px */
--text-3xl: 1.5rem;   /* H3: 24px */
```

### Tablet (768px - 1024px)
```css
--text-5xl: 2.5rem;   /* H1: 40px */
--text-4xl: 2rem;     /* H2: 32px */
--text-3xl: 1.75rem;  /* H3: 28px */
```

### Desktop (> 1024px)
Use default scale

## Accessibility Guidelines

### WCAG 2.1 Requirements
- Minimum font size: 16px for body text
- Line length: 45-75 characters optimal
- Line height: 1.5 minimum for body text
- Paragraph spacing: 1.5x line height minimum
- Letter spacing: 0.12x font size minimum
- Word spacing: 0.16x font size minimum

### Font Loading
```css
/* Prevent FOUT (Flash of Unstyled Text) */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  /* ... */
}
```

### Feature Settings
```css
body {
  font-feature-settings:
    "rlig" 1,  /* Required ligatures */
    "calt" 1;  /* Contextual alternates */
}
```

## Usage Guidelines

### DO
- Use display font for headings and hero text
- Use sans font for body text and UI
- Maintain consistent hierarchy
- Use semantic HTML headings (h1-h6)
- Test text at minimum 200% zoom
- Provide sufficient line height for readability

### DON'T
- Don't use more than 2 font families
- Don't skip heading levels (h1 → h3)
- Don't use font size alone for emphasis
- Don't use all caps for long text
- Don't use justified text
- Don't use line lengths > 80 characters

## Testing Checklist

- [ ] Text is readable at 200% zoom
- [ ] Line height provides adequate spacing
- [ ] Color contrast meets WCAG AA
- [ ] Font sizes scale responsively
- [ ] Headings follow semantic structure
- [ ] Links are distinguishable
- [ ] Font loads properly (no FOUT/FOIT)
