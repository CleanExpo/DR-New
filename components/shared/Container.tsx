// Responsive container component
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types/components';

interface ContainerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
}

const sizeVariants = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
} as const;

export function Container(...args: any[]): void {
  return (
    <div
      className={cn(
        sizeVariants[size],
        center && 'mx-auto',
        'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
