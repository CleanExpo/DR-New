# Modern UI/UX Design System

## Overview
The NRPG Platform features a sleek, professional design system inspired by modern SaaS applications. The system emphasizes:
- Smooth animations and transitions
- Glassmorphism effects
- Gradient-based color schemes
- Accessibility-first design
- Dark mode support

## Color Palette

### Primary Colors
```css
--primary-50: #eff6ff
--primary-100: #dbeafe
--primary-200: #bfdbfe
--primary-500: #3b82f6
--primary-600: #2563eb
--primary-700: #1d4ed8
```

### Accent Colors
```css
--accent-500: #8b5cf6 (Purple)
--accent-600: #7c3aed
```

### Status Colors
```css
--success-500: #10b981
--error-500: #ef4444
--warning-500: #f59e0b
```

## Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
```

### Mesh Gradient Background
Used for page backgrounds with subtle animated effect:
```css
--mesh-gradient: radial-gradient(at 40% 20%, hsla(221, 83%, 53%, 0.1) 0px, transparent 50%),
                  radial-gradient(at 80% 0%, hsla(274, 68%, 58%, 0.1) 0px, transparent 50%),
                  ...
```

## Components

### Modern Card
```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300" />
```

### Glassmorphism Card
```tsx
<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6" />
```

### Gradient Button
```tsx
<button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" />
```

### Modern Input Field
```tsx
<input className="w-full h-12 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none" />
```

### Animated Progress Bar
```tsx
<div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
  <motion.div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  />
</div>
```

## Shared Components

### StatCard
Displays statistics with gradient icons and hover effects.

```tsx
import { StatCard } from '@/components/ui/stat-card';

<StatCard
  icon={Users}
  label="Total Applications"
  value={150}
  trend="+12%"
  color="blue"
/>
```

**Props:**
- `icon`: LucideIcon - Icon component
- `label`: string - Stat label
- `value`: string | number - Stat value
- `trend?`: string - Trend indicator (e.g., "+12%")
- `color?`: 'blue' | 'green' | 'yellow' | 'red' | 'purple'

### StatBadge
Compact stat display for hero sections.

```tsx
import { StatBadge } from '@/components/ui/stat-badge';

<StatBadge
  icon={Clock}
  value="24/7"
  label="Job Alerts"
/>
```

### ModernInput
Enhanced input field with icon support and modern styling.

```tsx
import { ModernInput } from '@/components/ui/modern-input';
import { Mail } from 'lucide-react';

<ModernInput
  icon={Mail}
  label="Email Address"
  required
  error={hasError}
  errorMessage="Please enter a valid email"
  placeholder="john@example.com"
/>
```

### PasswordInput
Password field with show/hide toggle.

```tsx
import { PasswordInput } from '@/components/ui/password-input';

<PasswordInput
  error={hasError}
  placeholder="Enter password"
  {...register('password')}
/>
```

### PasswordStrength
Visual password strength indicator.

```tsx
import { PasswordStrength } from '@/components/ui/password-strength';

<PasswordStrength
  requirements={[
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[!@#$%^&*]/.test(password) },
  ]}
/>
```

## Animation Patterns

### Page Transitions
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
/>
```

### Hover Effects
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
/>
```

### Staggered Children
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Typography

### Display Text
```css
text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
```

### Headings
- H1: `text-4xl font-bold`
- H2: `text-3xl font-bold`
- H3: `text-2xl font-semibold`
- H4: `text-xl font-semibold`

### Body Text
- Large: `text-lg`
- Base: `text-base`
- Small: `text-sm`
- Extra Small: `text-xs`

## Spacing System

### Padding
- Small: `p-4`
- Medium: `p-6`
- Large: `p-8`

### Gaps
- Small: `gap-3`
- Medium: `gap-4`
- Large: `gap-6`

### Margin
- Small: `mb-4`
- Medium: `mb-6`
- Large: `mb-8`

## Border Radius

### Standard Sizes
- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)
- Extra Large: `rounded-3xl` (24px)

## Shadows

### Elevation Levels
- Low: `shadow-lg`
- Medium: `shadow-xl`
- High: `shadow-2xl`

### Hover States
```css
hover:shadow-2xl transition-shadow duration-300
```

## Dark Mode

All components support dark mode using Tailwind's `dark:` variant:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

## Accessibility

### Focus States
```css
focus:border-blue-500 focus:ring-4 focus:ring-blue-100
dark:focus:border-blue-600 dark:focus:ring-blue-900/50
```

### ARIA Labels
Always include proper ARIA labels for interactive elements:
```tsx
<button aria-label="Close modal">
  <X className="w-4 h-4" />
</button>
```

### Keyboard Navigation
Ensure all interactive elements are keyboard accessible:
```tsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Click me
</div>
```

## Implementation Examples

### Onboarding Wizard
The onboarding wizard demonstrates:
- Gradient background with mesh pattern
- Glassmorphism card design
- Animated progress bar with shimmer effect
- Modern input fields with icons
- Smooth step transitions

**File:** `app/onboarding/page.tsx`

### Admin Dashboard
The admin dashboard showcases:
- Stat cards with gradient icons
- Modern application cards with animations
- Hover effects and transitions
- Status indicators with color coding

**File:** `app/admin/onboarding/page.tsx`

### Progress Tracking
The progress bar component features:
- Animated gradient fill
- Pulsing current step indicator
- Smooth transitions between steps
- Percentage completion display

**File:** `components/onboarding/ProgressBar.tsx`

## Best Practices

1. **Consistency**: Always use the defined color palette and spacing system
2. **Performance**: Use `will-change` sparingly and only for animated elements
3. **Accessibility**: Test all interactive elements with keyboard navigation
4. **Dark Mode**: Test all components in both light and dark modes
5. **Responsive**: Ensure components work on all screen sizes
6. **Animation**: Keep animations subtle and purposeful
7. **Loading States**: Always provide visual feedback for async operations

## Future Enhancements

- [ ] Add micro-interactions for form validation
- [ ] Implement skeleton loading states
- [ ] Create notification toast system
- [ ] Add more gradient variations
- [ ] Enhance glassmorphism effects
- [ ] Create component showcase/storybook
