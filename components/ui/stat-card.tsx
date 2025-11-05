'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  className?: string;
}

const colorVariants = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-100 dark:ring-blue-900/50',
  },
  green: {
    gradient: 'from-green-500 to-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    ring: 'ring-green-100 dark:ring-green-900/50',
  },
  yellow: {
    gradient: 'from-yellow-500 to-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    ring: 'ring-yellow-100 dark:ring-yellow-900/50',
  },
  red: {
    gradient: 'from-red-500 to-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    ring: 'ring-red-100 dark:ring-red-900/50',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    ring: 'ring-purple-100 dark:ring-purple-900/50',
  },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = 'blue',
  className,
}: StatCardProps) {
  const colors = colorVariants[color];
  const trendIsPositive = trend?.startsWith('+');

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6',
        'hover:shadow-2xl transition-all duration-300',
        className
      )}
    >
      <div className="flex items-centre justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'w-12 h-12 bg-gradient-to-r rounded-xl flex items-centre justify-centre shadow-lg',
            colors.gradient
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        {trend && (
          <Badge
            variant={trendIsPositive ? 'default' : 'destructive'}
            className="font-semibold"
          >
            {trend}
          </Badge>
        )}
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-1"
        >
          {value}
        </motion.div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
