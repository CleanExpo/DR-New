import { cn } from "@/lib/utils"

function Skeleton(...args: any[]): void {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Text skeleton
function SkeletonText(...args: any[]): void {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-4/5" : "w-full"
          )}
        />
      ))}
    </div>
  )
}

// Card skeleton
function SkeletonCard(...args: any[]): void {
  return (
    <div className="rounded-xl border border-gray-200 p-6">
      <Skeleton className="h-12 w-12 rounded-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

// Service card skeleton
function SkeletonServiceCard(...args: any[]): void {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <Skeleton className="h-16 w-16 rounded-lg mb-4 mx-auto" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-10 w-full mt-4 rounded-lg" />
    </div>
  )
}

// Blog post skeleton
function SkeletonBlogPost(...args: any[]): void {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-8 w-3/4 mb-3" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </article>
  )
}

// Table skeleton
function SkeletonTable(...args: any[]): void {
  return (
    <div className="w-full">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="border-b border-gray-200 p-4 last:border-b-0">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  className={cn(
                    "h-4",
                    colIndex === 0 ? "w-full" : "w-4/5"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Form skeleton
function SkeletonForm(...args: any[]): void {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-4 w-28 mb-2" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
      <Skeleton className="h-12 w-32 rounded-lg" />
    </div>
  )
}

// Navigation skeleton
function SkeletonNavigation(...args: any[]): void {
  return (
    <div className="flex items-center space-x-6">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-20" />
    </div>
  )
}

// Stats skeleton
function SkeletonStats(...args: any[]): void {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
          <Skeleton className="h-12 w-12 rounded-lg mb-3" />
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

// Image gallery skeleton
function SkeletonGallery(...args: any[]): void {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  )
}

export { 
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonServiceCard,
  SkeletonBlogPost,
  SkeletonTable,
  SkeletonForm,
  SkeletonNavigation,
  SkeletonStats,
  SkeletonGallery
}