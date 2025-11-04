'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatBadgeProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
}

export function StatBadge({ icon: Icon, value, label, className }: StatBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3',
        'border border-white/20 shadow-lg',
        className
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="text-xs text-white/80">{label}</div>
      </div>
    </motion.div>
  );
}
