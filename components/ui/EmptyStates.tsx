'use client';

import * as React from 'react';
import {
  Search,
  FileQuestion,
  AlertCircle,
  Inbox,
  ImageOff,
  WifiOff,
  ShieldAlert,
  Construction
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ===== EMPTY STATE BASE ===== */
interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'primary' | 'outline';
  };
  className?: string;
}

export const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  const actionVariants = {
    default: 'bg-neutral-600 text-white hover:bg-neutral-700',
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30',
    outline: 'bg-white text-neutral-700 border-2 border-neutral-300 hover:bg-neutral-50',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6 py-12',
        'rounded-xl bg-neutral-50 border-2 border-dashed border-neutral-300',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-neutral-500" aria-hidden="true" />
      </div>

      <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">{title}</h3>
      <p className="text-base text-neutral-600 max-w-md mb-6">{description}</p>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg',
            'font-semibold text-base transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
            actionVariants[action.variant || 'default']
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

/* ===== NO RESULTS FOUND ===== */
interface NoResultsProps {
  query?: string;
  onReset?: () => void;
  className?: string;
}

export const NoResults = ({ query, onReset, className }: NoResultsProps) => {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={
        query
          ? `We couldn't find anything matching "${query}". Try adjusting your search.`
          : "We couldn't find any results. Try adjusting your filters."
      }
      action={
        onReset
          ? {
              label: 'Clear filters',
              onClick: onReset,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== NOT FOUND (404) ===== */
interface NotFoundProps {
  onGoHome?: () => void;
  className?: string;
}

export const NotFound = ({ onGoHome, className }: NotFoundProps) => {
  return (
    <EmptyState
      icon={FileQuestion}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={
        onGoHome
          ? {
              label: 'Go to homepage',
              onClick: onGoHome,
              variant: 'primary',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== ERROR STATE ===== */
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = "We're having trouble loading this content. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) => {
  return (
    <EmptyState
      icon={AlertCircle}
      title={title}
      description={message}
      action={
        onRetry
          ? {
              label: 'Try again',
              onClick: onRetry,
              variant: 'primary',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== NO CONNECTION ===== */
interface NoConnectionProps {
  onRetry?: () => void;
  className?: string;
}

export const NoConnection = ({ onRetry, className }: NoConnectionProps) => {
  return (
    <EmptyState
      icon={WifiOff}
      title="No internet connection"
      description="Please check your connection and try again."
      action={
        onRetry
          ? {
              label: 'Retry',
              onClick: onRetry,
              variant: 'primary',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== EMPTY INBOX ===== */
interface EmptyInboxProps {
  onCreate?: () => void;
  className?: string;
}

export const EmptyInbox = ({ onCreate, className }: EmptyInboxProps) => {
  return (
    <EmptyState
      icon={Inbox}
      title="Your inbox is empty"
      description="You don't have any messages yet. Check back later for updates."
      action={
        onCreate
          ? {
              label: 'Send a message',
              onClick: onCreate,
              variant: 'primary',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== IMAGE ERROR ===== */
interface ImageErrorProps {
  onRetry?: () => void;
  className?: string;
}

export const ImageError = ({ onRetry, className }: ImageErrorProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'bg-neutral-100 rounded-lg p-8 text-center',
        className
      )}
    >
      <ImageOff className="w-12 h-12 text-neutral-400 mb-3" aria-hidden="true" />
      <p className="text-sm font-medium text-neutral-600">Failed to load image</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-sm font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
};

/* ===== PERMISSION DENIED ===== */
interface PermissionDeniedProps {
  onGoBack?: () => void;
  className?: string;
}

export const PermissionDenied = ({ onGoBack, className }: PermissionDeniedProps) => {
  return (
    <EmptyState
      icon={ShieldAlert}
      title="Access denied"
      description="You don't have permission to view this content. Please contact support if you believe this is an error."
      action={
        onGoBack
          ? {
              label: 'Go back',
              onClick: onGoBack,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== UNDER CONSTRUCTION ===== */
interface UnderConstructionProps {
  onGoHome?: () => void;
  className?: string;
}

export const UnderConstruction = ({ onGoHome, className }: UnderConstructionProps) => {
  return (
    <EmptyState
      icon={Construction}
      title="Coming soon"
      description="We're working hard to bring you this feature. Check back soon!"
      action={
        onGoHome
          ? {
              label: 'Go to homepage',
              onClick: onGoHome,
              variant: 'primary',
            }
          : undefined
      }
      className={className}
    />
  );
};

/* ===== INLINE EMPTY STATE (For smaller contexts) ===== */
interface InlineEmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  message: string;
  className?: string;
}

export const InlineEmptyState = ({
  icon: Icon = Inbox,
  message,
  className,
}: InlineEmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-3 py-8 text-neutral-600',
        className
      )}
      role="status"
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
