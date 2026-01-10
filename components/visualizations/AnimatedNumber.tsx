'use client';

/**
 * Animated Number Component
 *
 * Displays a number with smooth animation from 0 to the target value
 * Used for displaying metrics, counters, and KPIs
 *
 * Usage:
 * ```tsx
 * <AnimatedNumber
 *   value={1250}
 *   format="currency"
 *   prefix="$"
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  format?: 'number' | 'currency' | 'percent';
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedNumber({
  value,
  format = 'number',
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const current = value * progress;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration]);

  const formatValue = (num: number): string => {
    let formatted = '';

    if (format === 'currency') {
      formatted = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(num);
    } else if (format === 'percent') {
      formatted = `${(num * 100).toFixed(decimals)}%`;
    } else {
      formatted = new Intl.NumberFormat('en-AU', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(num);
    }

    return formatted;
  };

  return (
    <span className={className}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
}
