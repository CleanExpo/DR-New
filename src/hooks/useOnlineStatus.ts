/**
 * useOnlineStatus - Network connectivity monitoring
 *
 * @example
 * const isOnline = useOnlineStatus();
 *
 * if (!isOnline) {
 *   return <OfflineBanner />;
 * }
 */

import { useEffect, useState } from 'react';

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Advanced network quality detection
 */
export interface NetworkQuality {
  online: boolean;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
  downlink: number; // Mbps
  rtt: number; // ms
  saveData: boolean;
}

export function useNetworkQuality(): NetworkQuality {
  const isOnline = useOnlineStatus();
  const [quality, setQuality] = useState<NetworkQuality>({
    online: isOnline,
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    const connection = (navigator as any).connection ||
                      (navigator as any).mozConnection ||
                      (navigator as any).webkitConnection;

    if (!connection) {
      setQuality(prev => ({ ...prev, online: isOnline }));
      return;
    }

    const updateQuality = () => {
      setQuality({
        online: isOnline,
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        saveData: connection.saveData || false,
      });
    };

    updateQuality();

    connection.addEventListener('change', updateQuality);
    return () => connection.removeEventListener('change', updateQuality);
  }, [isOnline]);

  return quality;
}

/**
 * Offline-ready hook with queue
 */
export function useOfflineQueue<T>(
  processFn: (item: T) => Promise<void>
) {
  const isOnline = useOnlineStatus();
  const [queue, setQueue] = useState<T[]>([]);
  const [processing, setProcessing] = useState(false);

  // Add item to queue
  const addToQueue = (item: T) => {
    setQueue(prev => [...prev, item]);
  };

  // Process queue when online
  useEffect(() => {
    if (!isOnline || queue.length === 0 || processing) {return;}

    const processQueue = async () => {
      setProcessing(true);

      while (queue.length > 0 && isOnline) {
        const item = queue[0];
        try {
          await processFn(item);
          setQueue(prev => prev.slice(1));
        } catch (error) {
          console.error('Error processing queued item:', error);
          break; // Stop processing on error
        }
      }

      setProcessing(false);
    };

    processQueue();
  }, [isOnline, queue, processing, processFn]);

  return {
    addToQueue,
    queueSize: queue.length,
    processing,
    isOnline,
  };
}
