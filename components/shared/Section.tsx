// Reusable Section component with consistent spacing and backgrounds
import { cn } from '@/lib/utils';
import { SectionProps } from '@/types/components';

const backgroundVariants = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  blue: 'bg-blue-50',
  dark: 'bg-gray-900 text-white',
} as const;

const paddingVariants = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
} as const;

export function Section(...args: any[]): void {
  return (
    <section
      id={id}
      className={cn(
        backgroundVariants[background],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
