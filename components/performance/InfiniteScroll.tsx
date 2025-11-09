/**
 * InfiniteScroll - Load more content as user scrolls
 */

'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver';

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  loader?: ReactNode;
  endMessage?: ReactNode;
  threshold?: number;
  className?: string;
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  loadMore,
  hasMore,
  isLoading,
  loader,
  endMessage,
  threshold = 0.8,
  className = '',
}: InfiniteScrollProps<T>) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: false,
  });

  const loadingRef = useRef(false);

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading && !loadingRef.current) {
      loadingRef.current = true;
      loadMore().finally(() => {
        loadingRef.current = false;
      });
    }
  }, [isIntersecting, hasMore, isLoading, loadMore]);

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}

      {hasMore && (
        <div ref={ref} className="py-8">
          {isLoading ? (
            loader || <DefaultLoader />
          ) : (
            <div className="h-4" /> // Sentinel element
          )}
        </div>
      )}

      {!hasMore && endMessage}
    </div>
  );
}

function DefaultLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      <span className="ml-3 text-gray-600">Loading more...</span>
    </div>
  );
}

/**
 * Example Usage:
 */
interface Testimonial {
  id: string;
  author: string;
  suburb: string;
  rating: number;
  text: string;
}

export function TestimonialsInfiniteScroll() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/testimonials?page=${page}&limit=10`);
      const data = await response.json();

      setTestimonials((prev) => [...prev, ...data.testimonials]);
      setPage((prev) => prev + 1);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      items={testimonials}
      renderItem={(testimonial) => (
        <div className="bg-white rounded-lg p-6 shadow-md mb-4">
          <div className="flex items-center mb-3">
            <span className="font-bold">{testimonial.author}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-600">{testimonial.suburb}</span>
            <span className="ml-auto text-yellow-500">
              {'★'.repeat(testimonial.rating)}
            </span>
          </div>
          <p className="text-gray-700">{testimonial.text}</p>
        </div>
      )}
      loadMore={loadMore}
      hasMore={hasMore}
      isLoading={isLoading}
      endMessage={
        <div className="text-center py-8 text-gray-600">
          <p className="font-semibold">You've reached the end!</p>
          <p className="text-sm mt-2">All testimonials loaded</p>
        </div>
      }
      className="max-w-4xl mx-auto"
    />
  );
}

/**
 * Paginated Grid Example
 */
interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export function ServicesInfiniteGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/services?page=${page}&limit=12`);
      const data = await response.json();

      setServices((prev) => [...prev, ...data.services]);
      setPage((prev) => prev + 1);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      items={services}
      renderItem={(service) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
      )}
      loadMore={loadMore}
      hasMore={hasMore}
      isLoading={isLoading}
      loader={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      }
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    />
  );
}
