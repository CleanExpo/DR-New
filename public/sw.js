/**
 * Service Worker for Disaster Recovery Website
 * Implements advanced caching strategies for optimal performance
 *
 * Cache Strategies:
 * - Cache First: Static assets (images, fonts, CSS, JS)
 * - Network First: API calls and dynamic content
 * - Stale While Revalidate: HTML pages
 * - Background Sync: Form submissions
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `disaster-recovery-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'runtime-cache';

// Assets to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/images/logo.png',
  '/fonts/inter-var.woff2',
];

// Patterns for different caching strategies
const CACHE_STRATEGIES = {
  // Cache first - for static assets
  cacheFirst: [
    /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/,
    /\.(?:woff|woff2|ttf|otf)$/,
    /\/_next\/static\//,
    /\/fonts\//,
  ],

  // Network first - for API and dynamic content
  networkFirst: [
    /\/api\//,
    /analytics/,
    /\.json$/,
  ],

  // Stale while revalidate - for HTML pages
  staleWhileRevalidate: [
    /\.(?:html)$/,
    /^\/$/,
    /\/services\//,
    /\/locations\//,
  ],
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets');
      return cache.addAll(STATIC_CACHE_URLS).catch((error) => {
        console.error('[Service Worker] Failed to cache:', error);
        // Continue installation even if some assets fail to cache
        return Promise.resolve();
      });
    })
  );

  // Force the new service worker to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Determine caching strategy
  const strategy = getCacheStrategy(request);

  switch (strategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(request));
      break;

    case 'network-first':
      event.respondWith(networkFirst(request));
      break;

    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(request));
      break;

    default:
      // Default to network only
      event.respondWith(fetch(request));
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    console.log('[Service Worker] Cache hit:', request.url);
    return cached;
  }

  console.log('[Service Worker] Cache miss, fetching:', request.url);

  try {
    const response = await fetch(request);

    // Only cache successful responses
    if (response.status === 200) {
      const cloned = response.clone();
      cache.put(request, cloned);
    }

    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    // Return offline page if available
    return caches.match('/offline');
  }
}

// Network First Strategy
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response.status === 200) {
      const cloned = response.clone();
      cache.put(request, cloned);
    }

    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', request.url);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // Return error response
    return new Response('Network error occurred', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  // Return cached version immediately if available
  const fetchPromise = fetch(request).then((response) => {
    // Update cache with fresh response
    if (response.status === 200) {
      const cloned = response.clone();
      cache.put(request, cloned);
    }
    return response;
  }).catch((error) => {
    console.error('[Service Worker] Revalidation failed:', error);
  });

  // Return cached version or wait for network
  return cached || fetchPromise;
}

// Determine cache strategy based on request
function getCacheStrategy(request) {
  const url = request.url;

  // Check cache first patterns
  for (const pattern of CACHE_STRATEGIES.cacheFirst) {
    if (pattern.test(url)) {
      return 'cache-first';
    }
  }

  // Check network first patterns
  for (const pattern of CACHE_STRATEGIES.networkFirst) {
    if (pattern.test(url)) {
      return 'network-first';
    }
  }

  // Check stale while revalidate patterns
  for (const pattern of CACHE_STRATEGIES.staleWhileRevalidate) {
    if (pattern.test(url)) {
      return 'stale-while-revalidate';
    }
  }

  // Default to network only
  return 'network-only';
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Get queued form submissions from IndexedDB
  // This would be implemented with actual IndexedDB logic
  console.log('[Service Worker] Syncing form submissions...');
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.action === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }

  if (event.data.action === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();

  event.waitUntil(
    event.respondWith.then(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log slow requests
      if (duration > 1000) {
        console.warn(`[Service Worker] Slow request: ${event.request.url} took ${duration}ms`);
      }
    })
  );
});