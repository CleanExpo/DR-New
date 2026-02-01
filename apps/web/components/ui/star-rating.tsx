'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StarRatingProps {
  /**
   * Current rating value (0-5)
   */
  value: number;
  /**
   * Callback when rating changes (for input mode)
   */
  onChange?: (rating: number) => void;
  /**
   * If true, stars are display-only (no interaction)
   */
  readonly?: boolean;
  /**
   * Size variant
   * - sm: 16px (h-4 w-4)
   * - md: 24px (h-6 w-6) [default]
   * - lg: 32px (h-8 w-8)
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * If true, shows numerical value next to stars (e.g., "4.5/5")
   */
  showValue?: boolean;
}

/**
 * StarRating Component
 *
 * A reusable star rating component that can be used for both
 * displaying ratings (readonly) and collecting ratings (interactive).
 *
 * Features:
 * - Interactive mode with hover preview
 * - Display-only mode for showing ratings
 * - Multiple size variants
 * - Optional numerical value display
 * - Accessible with keyboard support
 *
 * @example
 * // Display rating
 * <StarRating value={4.5} readonly showValue />
 *
 * @example
 * // Interactive rating input
 * <StarRating
 *   value={rating}
 *   onChange={setRating}
 *   size="lg"
 * />
 */
export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const handleClick = (star: number) => {
    if (!readonly && onChange) {
      onChange(star);
    }
  };

  const handleMouseEnter = (star: number) => {
    if (!readonly) {
      setHoverValue(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(0);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = displayValue >= star;

        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              'transition-all duration-150',
              !readonly && 'cursor-pointer hover:scale-110',
              readonly && 'cursor-default'
            )}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                'transition-colors',
                isFilled ? 'fill-[#FFD700] text-[#FFD700]' : 'text-[#6B7280]'
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm text-[#9CA3AF]">
          {value > 0 ? value.toFixed(1) : '0.0'}/5
        </span>
      )}
    </div>
  );
}
