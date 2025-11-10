/**
 * BundleAnalyzer - Client-side bundle size monitoring
 */

'use client';

import { useEffect, useState } from 'react';

interface BundleStats {
  totalSize: number;
  gzipSize: number;
  chunks: ChunkInfo[];
}

interface ChunkInfo {
  name: string;
  size: number;
  gzipSize: number;
}

/**
 * Monitor client-side bundle sizes
 */
export function useBundleMonitor() {
  const [stats, setStats] = useState<BundleStats | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !performance.getEntriesByType) {return;}

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    const jsResources = resources.filter(
      (r) => r.name.endsWith('.js') || r.name.includes('/_next/static/')
    );

    const chunks: ChunkInfo[] = jsResources.map((resource) => ({
      name: resource.name.split('/').pop() || 'unknown',
      size: resource.transferSize,
      gzipSize: resource.encodedBodySize,
    }));

    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    const gzipSize = chunks.reduce((sum, chunk) => sum + chunk.gzipSize, 0);

    setStats({
      totalSize,
      gzipSize,
      chunks,
    });

    // Log large bundles
    chunks.forEach((chunk) => {
      if (chunk.size > 200 * 1024) {
        // > 200KB
        console.warn(
          `[Bundle] Large chunk detected: ${chunk.name} (${formatBytes(chunk.size)})`
        );
      }
    });
  }, []);

  return stats;
}

/**
 * Bundle size warning component
 */
export function BundleSizeWarning({ threshold = 500 * 1024 }: { threshold?: number }) {
  const stats = useBundleMonitor();

  if (!stats || stats.totalSize < threshold) {return null;}

  return (
    <div
      className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-lg z-50"
      style={{ maxWidth: '300px' }}
    >
      <h4 className="font-bold text-yellow-800 mb-2">⚠️ Large Bundle Detected</h4>
      <p className="text-sm text-yellow-700 mb-2">
        Total bundle size: {formatBytes(stats.totalSize)}
      </p>
      <p className="text-xs text-yellow-600">
        Consider code splitting or lazy loading
      </p>
      <button
        onClick={() => logBundleReport(stats)}
        className="mt-2 text-xs text-yellow-800 underline hover:no-underline"
      >
        View Details
      </button>
    </div>
  );
}

/**
 * Format bytes to human-readable
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) {return '0 Bytes';}

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Log bundle report to console
 */
function logBundleReport(stats: BundleStats) {
  console.group('📦 Bundle Size Report');

  console.log(`Total Size: ${formatBytes(stats.totalSize)}`);
  console.log(`Gzip Size: ${formatBytes(stats.gzipSize)}`);
  console.log(
    `Compression Ratio: ${((stats.gzipSize / stats.totalSize) * 100).toFixed(1)}%`
  );

  console.log('\nLargest Chunks:');
  const largestChunks = stats.chunks
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .map((chunk) => ({
      Name: chunk.name,
      Size: formatBytes(chunk.size),
      Gzip: formatBytes(chunk.gzipSize),
    }));

  console.table(largestChunks);

  console.groupEnd();
}

/**
 * Performance budget checker
 */
interface PerformanceBudget {
  maxBundleSize: number; // bytes
  maxChunkSize: number; // bytes
  maxChunkCount: number;
}

const DEFAULT_BUDGET: PerformanceBudget = {
  maxBundleSize: 500 * 1024, // 500KB
  maxChunkSize: 200 * 1024, // 200KB
  maxChunkCount: 10,
};

export function checkPerformanceBudget(
  stats: BundleStats,
  budget: PerformanceBudget = DEFAULT_BUDGET
) {
  const violations: string[] = [];

  if (stats.totalSize > budget.maxBundleSize) {
    violations.push(
      `Total bundle size (${formatBytes(stats.totalSize)}) exceeds budget (${formatBytes(
        budget.maxBundleSize
      )})`
    );
  }

  const largeChunks = stats.chunks.filter((chunk) => chunk.size > budget.maxChunkSize);
  if (largeChunks.length > 0) {
    violations.push(
      `${largeChunks.length} chunk(s) exceed size budget (${formatBytes(
        budget.maxChunkSize
      )})`
    );
  }

  if (stats.chunks.length > budget.maxChunkCount) {
    violations.push(
      `Chunk count (${stats.chunks.length}) exceeds budget (${budget.maxChunkCount})`
    );
  }

  if (violations.length > 0) {
    console.error('❌ Performance Budget Violations:', violations);
    return false;
  }

  console.log('✅ Performance budget met');
  return true;
}

/**
 * Usage:
 *
 * // In development mode, add to layout:
 * import { BundleSizeWarning } from '@/components/performance/BundleAnalyzer';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       {process.env.NODE_ENV === 'development' && <BundleSizeWarning />}
 *     </>
 *   );
 * }
 */
