
/**
 * Modal Component
 *
 * Premium animated modal/dialog with Framer Motion
 * Context-aware: No animations in emergency context
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAnimation } from '@/lib/hooks/useAnimation';
import {
  modalOverlayVariants,
  modalContentVariants,
  modalTransition,
} from '@/lib/animations';
import { Button } from '../Button/Button';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      onClose,
      className = '',
      showCloseButton = true,
      size = 'md',
    },
    ref
  ) => {
    const { isAnimationEnabled } = useAnimation();

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    // Mobile-optimized: Ensure modal fits in viewport
    const modalMaxHeight = 'max-h-[90vh] sm:max-h-[calc(100vh-4rem)]';

    const handleClose = () => {
      onClose?.();
      onOpenChange(false);
    };

    // Handle escape key
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          handleClose();
        }
      };

      if (open) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }, [open]);

    return (
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={isAnimationEnabled ? { opacity: 0 } : { opacity: 1 }}
              animate={isAnimationEnabled ? { opacity: 1 } : { opacity: 1 }}
              exit={isAnimationEnabled ? { opacity: 0 } : { opacity: 1 }}
              transition={
                isAnimationEnabled ? { duration: 0.2 } : { duration: 0 }
              }
              onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
              <motion.div
                ref={ref}
                className={`pointer-events-auto bg-white rounded-lg shadow-lg ${sizeClasses[size]} ${modalMaxHeight} overflow-y-auto ${className}`}
                style={{
                  // Safe area for notched devices (iPhone X+, Android)
                  paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
                }}
                initial={isAnimationEnabled ? 'initial' : 'animate'}
                animate={isAnimationEnabled ? 'animate' : 'animate'}
                exit={isAnimationEnabled ? 'exit' : 'animate'}
                variants={
                  isAnimationEnabled
                    ? modalContentVariants
                    : { initial: {}, animate: {}, exit: {} }
                }
                transition={
                  isAnimationEnabled ? modalTransition : { duration: 0 }
                }
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
                    <div>
                      {title && (
                        <h2 className="text-lg font-semibold">{title}</h2>
                      )}
                      {description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {description}
                        </p>
                      )}
                    </div>
                    {showCloseButton && (
                      <button
                        onClick={handleClose}
                        className="ml-4 text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Body - scrollable content */}
                <div className="p-6">{children}</div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';

/**
 * ModalHeader Component
 */

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`p-6 border-b ${className}`}>
      {children}
    </div>
  )
);

ModalHeader.displayName = 'ModalHeader';

/**
 * ModalBody Component
 */

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`p-6 ${className}`}>
      {children}
    </div>
  )
);

ModalBody.displayName = 'ModalBody';

/**
 * ModalFooter Component
 */

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`p-6 border-t flex justify-end gap-3 ${className}`}>
      {children}
    </div>
  )
);

ModalFooter.displayName = 'ModalFooter';
