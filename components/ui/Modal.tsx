'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ===== MODAL ROOT ===== */
const Modal = DialogPrimitive.Root;

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

/* ===== MODAL OVERLAY ===== */
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[var(--z-modal-backdrop)] bg-neutral-900/80 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* ===== MODAL CONTENT ===== */
const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  }
>(({ className, children, size = 'md', ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-[var(--z-modal)] w-full translate-x-[-50%] translate-y-[-50%]',
        'bg-white rounded-2xl shadow-2xl',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'duration-300',
        'focus-visible:outline-none',
        {
          'max-w-sm': size === 'sm',
          'max-w-lg': size === 'md',
          'max-w-2xl': size === 'lg',
          'max-w-4xl': size === 'xl',
          'max-w-[95vw] h-[95vh]': size === 'full',
        },
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          'absolute right-4 top-4 rounded-lg p-2',
          'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'transition-colors duration-200',
          'disabled:pointer-events-none'
        )}
        aria-label="Close modal"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

/* ===== MODAL HEADER ===== */
const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 px-6 py-6 border-b border-neutral-200',
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = 'ModalHeader';

/* ===== MODAL FOOTER ===== */
const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 px-6 py-4 border-t border-neutral-200',
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = 'ModalFooter';

/* ===== MODAL TITLE ===== */
const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-2xl font-bold font-display text-neutral-900 leading-tight',
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

/* ===== MODAL DESCRIPTION ===== */
const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-base text-neutral-600 leading-relaxed', className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

/* ===== MODAL BODY ===== */
const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('px-6 py-6', className)}
    {...props}
  />
);
ModalBody.displayName = 'ModalBody';

/* ===== CONFIRMATION MODAL ===== */
interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'emergency' | 'warning';
  onConfirm: () => void | Promise<void>;
}

export const ConfirmationModal = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
}: ConfirmationModalProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error('Confirmation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyles = {
    default: 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/30',
    emergency: 'bg-emergency-600 hover:bg-emergency-700 text-white shadow-emergency-500/30',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white shadow-warning-500/30',
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className={cn(
              'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg',
              'bg-white text-neutral-700 border-2 border-neutral-300',
              'hover:bg-neutral-50 hover:border-neutral-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200 font-semibold text-base'
            )}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200 font-semibold text-base shadow-lg',
              buttonStyles[variant]
            )}
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Processing...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
};
