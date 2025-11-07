// Empty state component for no data scenarios
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState(...args: any[]): void {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="flex justify-center mb-4">
        {icon || <FileQuestion className="w-16 h-16 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
