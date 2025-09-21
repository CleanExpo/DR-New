// Advanced Service Worker for PWA and Performance
// Version: 2.0.0 - Performance Optimized

const VERSION = 'v2.0.0';
const CACHE_NAME = `disaster-recovery-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const IMAGE_CACHE = `images-${VERSION}`;

// Core assets that should be cached immediately
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/_next/static/css/app.css',
  '/logos/disaster-recovery-logo.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Network first, fallback to cache
  networkFirst: async (request) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },

  // Cache first, fallback to network
  cacheFirst: async (request) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      return new Response('Resource not available offline', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }
  },

  // Stale while revalidate
  staleWhileRevalidate: async (request) => {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request).then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    });

    return cachedResponse || fetchPromise;
  }
};

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching critical assets');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('disaster-recovery-') &&
                   cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle different resource types with appropriate strategies

  // API calls - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    return;
  }

  // Images - cache first with separate cache
  if (request.destination === 'image' ||
      /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          // Background update for images
          fetch(request).then(response => {
            if (response.ok) {
              cache.put(request, response);
            }
          });
          return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      })
    );
    return;
  }

  // Static assets (CSS, JS) - cache first
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      url.pathname.startsWith('/_next/static/')) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
    return;
  }

  // HTML pages - stale while revalidate
  if (request.mode === 'navigate' ||
      request.headers.get('accept').includes('text/html')) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
    return;
  }

  // Default - stale while revalidate
  event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

async function syncOfflineForms() {
  try {
    const formData = await getOfflineFormData();
    if (formData && formData.length > 0) {
      for (const data of formData) {
        await fetch(data.url, {
          method: 'POST',
          body: JSON.stringify(data.body),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      await clearOfflineFormData();
    }
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

// Helper functions for offline form data (using IndexedDB)
async function getOfflineFormData() {
  // Implementation would use IndexedDB
  return [];
}

async function clearOfflineFormData() {
  // Implementation would clear IndexedDB
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Emergency Update Available',
    icon: '/logos/disaster-recovery-logo.png',
    badge: '/logos/disaster-recovery-logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/images/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Disaster Recovery Alert', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync for updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-check') {
    event.waitUntil(checkForUpdates());
  }
});

async function checkForUpdates() {
  try {
    const response = await fetch('/api/version');
    const data = await response.json();

    if (data.version !== VERSION) {
      self.registration.showNotification('Update Available', {
        body: 'A new version of the app is available. Click to update.',
        icon: '/logos/disaster-recovery-logo.png'
      });
    }
  } catch (error) {
    console.error('[Service Worker] Update check failed:', error);
  }
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data.action === 'GET_CACHE_SIZE') {
    event.ports[0].postMessage({
      cacheSize: calculateCacheSize()
    });
  }

  if (event.data.action === 'CLEAR_CACHE') {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

async function calculateCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}

console.log('[Service Worker] Advanced Service Worker loaded - Version:', VERSION);