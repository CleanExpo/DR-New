/**
 * Performance-Optimized Service Worker
 * Implements advanced caching strategies for maximum performance
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAMES = {
  static: `static-cache-${CACHE_VERSION}`,
  dynamic: `dynamic-cache-${CACHE_VERSION}`,
  images: `image-cache-${CACHE_VERSION}`,
  fonts: `font-cache-${CACHE_VERSION}`,
  api: `api-cache-${CACHE_VERSION}`
};

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/styles/critical.css',
  '/fonts/inter.woff2',
  '/fonts/poppins.woff2'
];

// Cache strategies
const CACHE_STRATEGIES = {
  cacheFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) {
      // Update cache in background
      fetch(request).then(response => {
        if (response && response.status === 200) {
          cache.put(request, response.clone());
        }
      });
      return cached;
    }
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  },

  networkFirst: async (request, cacheName, timeout = 5000) => {
    const cache = await caches.open(cacheName);
    try {
      const networkPromise = fetch(request);
      const timeoutPromise = new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
      );

      const response = await Promise.race([networkPromise, timeoutPromise]);
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      throw error;
    }
  },

  staleWhileRevalidate: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const fetchPromise = fetch(request).then(response => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    });

    return cached || fetchPromise;
  },

  networkOnly: async (request) => {
    return fetch(request);
  },

  cacheOnly: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (!cached) {
      throw new Error('No cache match');
    }
    return cached;
  }
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');

  event.waitUntil(
    caches.open(CACHE_NAMES.static).then(cache => {
      console.log('[ServiceWorker] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(error => {
        console.error('[ServiceWorker] Failed to cache:', error);
      });
    }).then(() => {
      // Skip waiting to activate immediately
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return !Object.values(CACHE_NAMES).includes(cacheName);
          })
          .map(cacheName => {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      // Claim all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // API requests - Network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      CACHE_STRATEGIES.networkFirst(request, CACHE_NAMES.api, 3000).catch(() => {
        // Return cached response or error
        return caches.match(request) || new Response(
          JSON.stringify({ error: 'Network error' }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  // Static assets (JS, CSS) - Cache first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  ) {
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.static).catch(() => {
        return fetch(request);
      })
    );
    return;
  }

  // Images - Cache first with long expiry
  if (
    url.pathname.startsWith('/_next/image') ||
    url.pathname.startsWith('/images/') ||
    request.destination === 'image'
  ) {
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.images).catch(() => {
        // Return placeholder image on error
        return caches.match('/images/placeholder.jpg') || fetch(request);
      })
    );
    return;
  }

  // Fonts - Cache first (permanent)
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.pathname.includes('/fonts/')
  ) {
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.fonts).catch(() => {
        return fetch(request);
      })
    );
    return;
  }

  // HTML pages - Network first with cache fallback
  if (
    request.mode === 'navigate' ||
    request.headers.get('accept')?.includes('text/html')
  ) {
    event.respondWith(
      CACHE_STRATEGIES.networkFirst(request, CACHE_NAMES.dynamic, 3000).catch(() => {
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/offline.html') || new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/html' }
          });
        }
        return caches.match(request);
      })
    );
    return;
  }

  // Default - Stale while revalidate
  event.respondWith(
    CACHE_STRATEGIES.staleWhileRevalidate(request, CACHE_NAMES.dynamic).catch(() => {
      return fetch(request);
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

// Periodic background sync for cache updates
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

// Message handling for cache control
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.payload;
    event.waitUntil(
      caches.open(CACHE_NAMES.dynamic).then(cache => {
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url).then(response => {
              if (response.status === 200) {
                return cache.put(url, response);
              }
            }).catch(error => {
              console.error(`Failed to cache ${url}:`, error);
            });
          })
        );
      })
    );
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});

// Helper functions
async function syncOfflineForms() {
  // Implement offline form sync logic
  console.log('[ServiceWorker] Syncing offline forms');
}

async function updateCache() {
  // Update critical resources in cache
  const cache = await caches.open(CACHE_NAMES.static);
  const requests = STATIC_ASSETS.map(url => new Request(url));

  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response && response.status === 200) {
        await cache.put(request, response);
      }
    } catch (error) {
      console.error('[ServiceWorker] Cache update failed:', error);
    }
  }
}

// Performance monitoring
self.addEventListener('fetch', event => {
  const startTime = performance.now();

  event.waitUntil(
    (async () => {
      try {
        await event.response;
        const duration = performance.now() - startTime;

        // Log slow requests
        if (duration > 1000) {
          console.warn(`[ServiceWorker] Slow request: ${event.request.url} took ${duration}ms`);
        }

        // Send performance data to analytics
        if (self.clients) {
          const client = await self.clients.get(event.clientId);
          if (client) {
            client.postMessage({
              type: 'PERFORMANCE_DATA',
              payload: {
                url: event.request.url,
                duration: Math.round(duration),
                cacheHit: event.response?.headers?.get('x-cache') === 'HIT'
              }
            });
          }
        }
      } catch (error) {
        // Ignore errors in monitoring
      }
    })()
  );
});

console.log('[ServiceWorker] Loaded performance-optimized service worker');