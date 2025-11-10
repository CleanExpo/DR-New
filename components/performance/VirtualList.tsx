/**
 * VirtualList - Custom virtual scrolling implementation (no external dependencies)
 *
 * Reduces DOM nodes for large lists by only rendering visible items
 */

'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number; // Number of items to render outside viewport
  className?: string;
  gap?: number; // Gap between items in pixels
}

export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  overscan = 3,
  className = '',
  gap = 0,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const { height: windowHeight } = useWindowSize();

  // Calculate visible range
  const totalHeight = items.length * (itemHeight + gap);
  const containerHeight = windowHeight || 600; // Fallback height

  const startIndex = Math.max(0, Math.floor(scrollTop / (itemHeight + gap)) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / (itemHeight + gap)) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * (itemHeight + gap);

  // Handle scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {return;}

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: itemHeight,
                marginBottom: gap,
              }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * VirtualGrid - Virtual scrolling for grid layouts
 */
interface VirtualGridProps<T> {
  items: T[];
  itemHeight: number;
  columnCount: number;
  renderItem: (item: T, index: number) => ReactNode;
  gap?: number;
  className?: string;
}

export function VirtualGrid<T>({
  items,
  itemHeight,
  columnCount,
  renderItem,
  gap = 16,
  className = '',
}: VirtualGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const { height: windowHeight } = useWindowSize();

  const rowHeight = itemHeight + gap;
  const rowCount = Math.ceil(items.length / columnCount);
  const totalHeight = rowCount * rowHeight;
  const containerHeight = windowHeight || 600;

  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
  const endRow = Math.min(
    rowCount - 1,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + 1
  );

  const visibleRows: T[][] = [];
  for (let row = startRow; row <= endRow; row++) {
    const rowItems: T[] = [];
    for (let col = 0; col < columnCount; col++) {
      const index = row * columnCount + col;
      if (index < items.length) {
        rowItems.push(items[index]);
      }
    }
    if (rowItems.length > 0) {
      visibleRows.push(rowItems);
    }
  }

  const offsetY = startRow * rowHeight;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {return;}

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            display: 'grid',
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {visibleRows.map((row, rowIndex) =>
            row.map((item, colIndex) => {
              const itemIndex = (startRow + rowIndex) * columnCount + colIndex;
              return (
                <div key={itemIndex} style={{ height: itemHeight }}>
                  {renderItem(item, itemIndex)}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Example Usage:
 *
 * interface Suburb {
 *   name: string;
 *   postcode: string;
 *   region: string;
 * }
 *
 * const suburbs: Suburb[] = [...]; // 500+ suburbs
 *
 * <VirtualList
 *   items={suburbs}
 *   itemHeight={80}
 *   renderItem={(suburb) => (
 *     <div className="p-4 border-b">
 *       <h3>{suburb.name}</h3>
 *       <p>{suburb.postcode} - {suburb.region}</p>
 *     </div>
 *   )}
 * />
 *
 * // Grid example:
 * <VirtualGrid
 *   items={services}
 *   itemHeight={200}
 *   columnCount={3}
 *   gap={16}
 *   renderItem={(service) => (
 *     <ServiceCard service={service} />
 *   )}
 * />
 */

/**
 * Brisbane Suburbs Virtual List Example
 */
interface BrisbaneSuburb {
  name: string;
  postcode: string;
  region: 'Brisbane' | 'Ipswich' | 'Logan';
  premium: boolean;
}

export function BrisbaneSuburbsList({ suburbs }: { suburbs: BrisbaneSuburb[] }) {
  return (
    <VirtualList
      items={suburbs}
      itemHeight={100}
      gap={8}
      className="max-h-[600px] border rounded-lg"
      renderItem={(suburb) => (
        <div
          className={`p-4 rounded-lg border ${
            suburb.premium ? 'bg-gold-50 border-gold-300' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{suburb.name}</h3>
              <p className="text-sm text-gray-600">
                {suburb.postcode} • {suburb.region}
              </p>
            </div>
            {suburb.premium && (
              <span className="px-3 py-1 bg-gold-500 text-white text-xs font-semibold rounded-full">
                60-min Response
              </span>
            )}
          </div>
          <button className="mt-2 text-blue-600 hover:underline text-sm font-medium">
            View Service Area →
          </button>
        </div>
      )}
    />
  );
}
