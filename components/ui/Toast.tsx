'use client';

import * as React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ===== TOAST TYPES ===== */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/* ===== TOAST CONTEXT ===== */
interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/* ===== TOAST PROVIDER ===== */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      variant: 'default',
      duration: 5000,
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/* ===== TOAST CONTAINER ===== */
interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div
      className="fixed top-0 right-0 z-[var(--z-toast)] flex flex-col gap-3 p-4 sm:p-6 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

/* ===== TOAST ITEM ===== */
interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const variantStyles = {
    default: {
      bg: 'bg-neutral-900',
      text: 'text-white',
      icon: Info,
      iconColor: 'text-blue-400',
    },
    success: {
      bg: 'bg-success-600',
      text: 'text-white',
      icon: CheckCircle2,
      iconColor: 'text-white',
    },
    error: {
      bg: 'bg-emergency-600',
      text: 'text-white',
      icon: AlertCircle,
      iconColor: 'text-white',
    },
    warning: {
      bg: 'bg-warning-600',
      text: 'text-white',
      icon: AlertTriangle,
      iconColor: 'text-white',
    },
    info: {
      bg: 'bg-primary-600',
      text: 'text-white',
      icon: Info,
      iconColor: 'text-white',
    },
  };

  const variant = variantStyles[toast.variant || 'default'];
  const Icon = variant.icon;

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm rounded-lg shadow-lg',
        'border-2 border-transparent',
        variant.bg,
        variant.text,
        'transform transition-all duration-300 ease-out',
        isExiting
          ? 'translate-x-full opacity-0'
          : 'translate-x-0 opacity-100 animate-in slide-in-from-right-full'
      )}
      role="alert"
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', variant.iconColor)} aria-hidden="true" />

        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-tight">{toast.title}</p>
          {toast.description && (
            <p className="text-sm opacity-90 leading-relaxed">{toast.description}</p>
          )}

          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                handleRemove();
              }}
              className={cn(
                'mt-2 text-sm font-semibold underline underline-offset-2',
                'hover:opacity-80 transition-opacity',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
                'focus-visible:ring-offset-transparent rounded-sm'
              )}
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleRemove}
          className={cn(
            'shrink-0 rounded-lg p-1',
            'hover:bg-white/20 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
            'focus-visible:ring-offset-transparent'
          )}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="h-1 w-full bg-white/20 overflow-hidden rounded-b-lg">
          <div
            className="h-full bg-white/60"
            style={{
              animation: `toast-progress ${toast.duration}ms linear`,
            }}
          />
        </div>
      )}
    </div>
  );
};

/* ===== TOAST HELPERS ===== */
export const toast = {
  success: (title: string, description?: string) => ({
    title,
    description,
    variant: 'success' as ToastVariant,
  }),
  error: (title: string, description?: string) => ({
    title,
    description,
    variant: 'error' as ToastVariant,
  }),
  warning: (title: string, description?: string) => ({
    title,
    description,
    variant: 'warning' as ToastVariant,
  }),
  info: (title: string, description?: string) => ({
    title,
    description,
    variant: 'info' as ToastVariant,
  }),
};

/* ===== TOAST ANIMATIONS (Add to globals.css) ===== */
/*
@keyframes toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
*/
