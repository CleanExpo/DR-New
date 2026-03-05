/**
 * Emergency Button Component - NRPG Brand
 *
 * Distinctive emergency CTA button matching Phil McGurk's 15-year brand
 * Navigates to the emergency claim form — no phone numbers displayed.
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

interface EmergencyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'lg' | 'xl';
  showPulse?: boolean;
  label?: string;
}

const CLAIM_URL = '/claim/step-1?emergency=true';
const DEFAULT_LABEL = 'Submit Emergency Claim';

export function EmergencyButton({
  className,
  size = 'default',
  showPulse = true,
  label,
  onClick,
  ...props
}: EmergencyButtonProps) {
  const sizeClasses = {
    default: 'px-7 py-3 text-sm',
    lg: 'px-10 py-5 text-lg',
    xl: 'px-12 py-6 text-2xl',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    window.location.href = CLAIM_URL;
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'bg-nrpg-red hover:bg-nrpg-red/90 text-white rounded-3xl font-black',
        'shadow-2xl shadow-nrpg-red/30 hover:shadow-nrpg-red/40',
        'transition-[background-color,box-shadow,transform] duration-300 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]',
        'active:scale-95',
        'flex items-center gap-2',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {showPulse && (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      )}
      {label || DEFAULT_LABEL}
    </button>
  );
}

// Variant: With label above
export function EmergencyButtonLabeled({
  label = 'Emergency',
  className,
  ...props
}: Omit<EmergencyButtonProps, 'label'> & { label?: string }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
        {label}
      </span>
      <EmergencyButton {...props} className={className} />
    </div>
  );
}

// Variant: Inline with icon
export function EmergencyButtonInline({
  icon,
  className,
  ...props
}: EmergencyButtonProps & { icon?: React.ReactNode }) {
  return (
    <EmergencyButton
      className={cn('gap-3', className)}
      showPulse={false}
      {...props}
    >
      {icon}
      <span>{DEFAULT_LABEL}</span>
    </EmergencyButton>
  );
}
