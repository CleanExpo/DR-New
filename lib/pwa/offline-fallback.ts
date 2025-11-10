'use client';

import { useEffect, useState } from 'react';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        // Show reconnected notification
        console.log('Connection restored');
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  return { isOnline, wasOffline };
}

export function getOfflineContent() {
  return {
    title: 'You\'re Offline',
    message: 'It looks like you\'ve lost your internet connection. Some features may be limited.',
    emergencyMessage: 'For emergency assistance, please call 1300 309 361 when you have connection.',
    cachedMessage: 'Don\'t worry - you can still browse cached pages.',
    actions: [
      {
        label: 'Try Again',
        action: () => window.location.reload()
      },
      {
        label: 'View Cached Content',
        action: () => window.history.back()
      }
    ]
  };
}

// Queue form submissions for when connection is restored
export class OfflineFormQueue {
  private queueKey = 'disaster-recovery-offline-forms';

  addToQueue(formData: any) {
    const queue = this.getQueue();
    queue.push({
      data: formData,
      timestamp: Date.now(),
      id: crypto.randomUUID()
    });
    localStorage.setItem(this.queueKey, JSON.stringify(queue));
  }

  getQueue() {
    const queue = localStorage.getItem(this.queueKey);
    return queue ? JSON.parse(queue) : [];
  }

  async processQueue() {
    const queue = this.getQueue();
    if (queue.length === 0) {return;}

    const results = await Promise.allSettled(
      queue.map(async (item: any) => {
        const response = await fetch('/api/contact/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data)
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        return item.id;
      })
    );

    // Remove successfully submitted forms
    const successfulIds = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<string>).value);

    const remainingQueue = queue.filter((item: any) => !successfulIds.includes(item.id));
    localStorage.setItem(this.queueKey, JSON.stringify(remainingQueue));

    return {
      processed: successfulIds.length,
      failed: queue.length - successfulIds.length
    };
  }

  clearQueue() {
    localStorage.removeItem(this.queueKey);
  }
}
