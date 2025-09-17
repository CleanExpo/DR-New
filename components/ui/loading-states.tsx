'use client';

import { motion } from 'framer-motion';

// Skeleton loader for text content
export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          style={{ width: `${Math.random() * 30 + 70}%` }}
        />
      ))}
    </div>
  );
}

// Skeleton loader for cards
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-sm ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded-md w-full" />
        <div className="h-4 bg-gray-200 rounded-md w-5/6" />
        <div className="h-4 bg-gray-200 rounded-md w-4/6" />
      </div>
    </motion.div>
  );
}

// Image skeleton loader
export function ImageSkeleton({ className = '', aspectRatio = 'aspect-video' }: { className?: string; aspectRatio?: string }) {
  return (
    <motion.div
      className={`bg-gray-200 rounded-lg ${aspectRatio} ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </motion.div>
  );
}

// Loading spinner
export function LoadingSpinner({ size = 'md', color = 'primary' }: { size?: 'sm' | 'md' | 'lg'; color?: 'primary' | 'white' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    white: 'text-white'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
}

// Full page loader
export function PageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 font-medium">{text}</p>
      </motion.div>
    </div>
  );
}

// Content loader wrapper with loading state
export function ContentLoader({
  isLoading,
  children,
  skeleton,
  className = ''
}: {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  className?: string;
}) {
  if (isLoading) {
    return <div className={className}>{skeleton || <TextSkeleton />}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Emergency service loading indicator
export function EmergencyLoader() {
  return (
    <motion.div
      className="bg-red-600 text-white p-4 rounded-lg shadow-lg"
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </div>
        <span className="font-semibold">Connecting to emergency services...</span>
      </div>
    </motion.div>
  );
}