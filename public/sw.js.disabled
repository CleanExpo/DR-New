/**
 * Service Worker for Disaster Recovery Brisbane
 * Implements advanced caching strategies for offline support and performance
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAMES = {
  static: `static-cache-${CACHE_VERSION}`,
  dynamic: `dynamic-cache-${CACHE_VERSION}`,
  images: `image-cache-${CACHE_VERSION}`,
  api: `api-cache-${CACHE_VERSION}`,
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/css/app.css',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/framework.js',
  '/images/hero/disaster-recovery-services.jpg',
  '/favicon.ico',
];

// Cache strategies
const CACHE_STRATEGIES = {
  networkFirst: ['/api/', '/_next/data/'],
  cacheFirst: ['/images/', '/fonts/', '/_next/static/'],
  staleWhileRevalidate: ['/', '/services/', '/locations/'],
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAMES.static).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error('[Service Worker] Failed to cache:', error);
      });
    })
  );

  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!Object.values(CACHE_NAMES).includes(cacheName)) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      clients.claim(),
    ])
  );
});

// Helper function to determine cache strategy
function getCacheStrategy(url) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => url.includes(pattern))) {
      return strategy;
    }
  }
  return 'networkFirst'; // Default strategy
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Fallback to cache if network fails
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }

    throw error;
  }
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // Update cache in background
    fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        caches.open(cacheName).then((cache) => {
          cache.put(request, networkResponse);
        });
      }
    }).catch(() => {}); // Silently fail background update

    return cachedResponse;
  }

  // Fallback to network if not in cache
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      caches.open(cacheName).then((cache) => {
        cache.put(request, networkResponse.clone());
      });
    }
    return networkResponse;
  }).catch(() => {
    // Return offline page for navigation failures
    if (request.mode === 'navigate' && !cachedResponse) {
      return caches.match('/offline');
    }
    return cachedResponse;
  });

  return cachedResponse || fetchPromise;
}

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine cache strategy
  const strategy = getCacheStrategy(url.pathname);

  // Select appropriate cache
  let cacheName = CACHE_NAMES.dynamic;
  if (url.pathname.includes('/images/')) {
    cacheName = CACHE_NAMES.images;
  } else if (url.pathname.includes('/api/')) {
    cacheName = CACHE_NAMES.api;
  } else if (url.pathname.includes('/_next/static/')) {
    cacheName = CACHE_NAMES.static;
  }

  // Apply caching strategy
  event.respondWith(
    (async () => {
      switch (strategy) {
        case 'networkFirst':
          return networkFirst(request, cacheName);
        case 'cacheFirst':
          return cacheFirst(request, cacheName);
        case 'staleWhileRevalidate':
          return staleWhileRevalidate(request, cacheName);
        default:
          return fetch(request);
      }
    })()
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

async function syncOfflineForms() {
  // Get pending form submissions from IndexedDB
  // This is a placeholder - implement actual sync logic
  console.log('[Service Worker] Syncing offline forms...');
}

// Push notifications for emergency updates
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Emergency update from Disaster Recovery Brisbane',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'call',
        title: 'Call Now',
        icon: '/images/icons/phone.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/icons/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Disaster Recovery Brisbane', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'call') {
    // Open phone dialer
    event.waitUntil(
      clients.openWindow('tel:1300309361')
    );
  } else {
    // Open main site
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({
        type: 'CACHE_SIZE',
        size: size
      });
    });
  }
});

// Utility function to get cache size
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
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

// Periodic cache cleanup (run every 24 hours)
setInterval(() => {
  cleanupCache();
}, 24 * 60 * 60 * 1000);

async function cleanupCache() {
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  const now = Date.now();

  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    if (cacheName === CACHE_NAMES.static) continue; // Don't clean static cache

    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader) {
          const responseDate = new Date(dateHeader).getTime();
          if (now - responseDate > maxAge) {
            await cache.delete(request);
          }
        }
      }
    }
  }
}

console.log('[Service Worker] Loaded successfully');