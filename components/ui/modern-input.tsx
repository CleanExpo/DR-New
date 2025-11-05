'use client';

import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
}

export const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
  ({ icon: Icon, error, errorMessage, label, required, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          <Input
            {...props}
            ref={ref}
            className={cn(
              'h-12 rounded-xl border-2 transition-all',
              Icon && 'pl-12',
              error
                ? 'border-red-500 focus:ring-red-100'
                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:focus:border-blue-600 dark:focus:ring-blue-900/50',
              className
            )}
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-red-500 mt-1.5 flex items-centre gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

ModernInput.displayName = 'ModernInput';
