'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

interface PasswordStrengthProps {
  requirements: PasswordRequirement[];
  className?: string;
}

export function PasswordStrength({ requirements, className }: PasswordStrengthProps) {
  const metCount = requirements.filter((r) => r.met).length;
  const strength = (metCount / requirements.length) * 100;

  const getStrengthColor = () => {
    if (strength === 100) return 'bg-green-500';
    if (strength >= 75) return 'bg-blue-500';
    if (strength >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStrengthLabel = () => {
    if (strength === 100) return 'Strong';
    if (strength >= 75) return 'Good';
    if (strength >= 50) return 'Fair';
    return 'Weak';
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Strength Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Password Strength
          </span>
          <span
            className={cn(
              'text-xs font-semibold',
              strength === 100 && 'text-green-600',
              strength >= 75 && strength < 100 && 'text-blue-600',
              strength >= 50 && strength < 75 && 'text-yellow-600',
              strength < 50 && 'text-red-600'
            )}
          >
            {getStrengthLabel()}
          </span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strength}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn('h-full rounded-full transition-colors', getStrengthColor())}
          />
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-1.5">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Password Requirements:
        </div>
        {requirements.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 text-xs"
          >
            <div
              className={cn(
                'flex items-center justify-center w-4 h-4 rounded-full transition-colors',
                req.met
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              {req.met ? (
                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
              ) : (
                <X className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <span
              className={cn(
                'transition-colors',
                req.met
                  ? 'text-green-700 dark:text-green-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {req.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
