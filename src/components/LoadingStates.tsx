'use client';

export const ServiceCardSkeleton = () => (
  <div 
    className="relative h-full p-6 rounded-2xl animate-pulse"
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}
  >
    {/* Icon placeholder */}
    <div className="w-14 h-14 bg-gray-600 rounded-xl mb-4 animate-pulse" />
    
    {/* Title placeholder */}
    <div className="h-6 bg-gray-600 rounded-md mb-2 animate-pulse" style={{ width: '80%' }} />
    
    {/* Description placeholder - simplified */}
    <div className="h-4 bg-gray-700 rounded animate-pulse mb-4" />
    
    {/* Features placeholder - simplified */}
    <div className="h-3 bg-gray-700 rounded animate-pulse" style={{ width: '50%' }} />
  </div>
);

export const HeroSkeleton = () => (
  <div className="py-20">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="skeleton h-16 w-3/4 mx-auto mb-4" />
        <div className="skeleton h-16 w-1/2 mx-auto mb-6" />
        <div className="skeleton h-6 w-2/3 mx-auto mb-8" />
        <div className="flex gap-4 justify-center">
          <div className="skeleton h-14 w-40 rounded-lg" />
          <div className="skeleton h-14 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`spinner ${sizeClasses[size]}`} />
    </div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[9999] flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-lg font-medium gradient-text">Loading...</p>
      <p className="mt-2 text-sm text-gray-700">Preparing your experience</p>
    </div>
  </div>
);

export const LoadingDots = () => (
  <span className="inline-flex gap-1">
    <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
    <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
  </span>
);