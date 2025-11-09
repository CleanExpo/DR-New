const CACHE_NAME = 'disaster-recovery-v2-performance';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const IMAGE_CACHE = 'images-v2';

const urlsToCache = [
  '/',
  '/services',
  '/locations',
  '/emergency',
  '/about',
  '/contact',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/logos/3D-Disaster-Recovery-Logo.png',
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  images: {
    cacheName: IMAGE_CACHE,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxItems: 100,
  },
  static: {
    cacheName: STATIC_CACHE,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxItems: 50,
  },
  dynamic: {
    cacheName: DYNAMIC_CACHE,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxItems: 30,
  },
};

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(urlsToCache)),
      caches.open(IMAGE_CACHE),
      caches.open(DYNAMIC_CACHE),
    ]).catch(error => {
      console.error('Cache installation failed:', error);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: Check if request is for an image
function isImage(request) {
  return request.destination === 'image' ||
         /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(request.url);
}

// Helper: Check if request is for static asset
function isStaticAsset(request) {
  return /\.(js|css|woff|woff2|ttf|eot)$/i.test(request.url);
}

// Helper: Trim cache to max items
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxItems);
  }
}

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip cross-origin requests (except fonts and images from CDN)
  if (!request.url.startsWith(self.location.origin) &&
      !request.url.includes('fonts.gstatic.com') &&
      !request.url.includes('fonts.googleapis.com')) {
    return;
  }

  // Network-first strategy for API calls
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Stale-while-revalidate for images
  if (isImage(request)) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(request, responseToCache);
              trimCache(IMAGE_CACHE, CACHE_STRATEGIES.images.maxItems);
            });
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, fonts)
  if (isStaticAsset(request)) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseToCache);
              trimCache(STATIC_CACHE, CACHE_STRATEGIES.static.maxItems);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Network-first with cache fallback for HTML pages
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
            trimCache(DYNAMIC_CACHE, CACHE_STRATEGIES.dynamic.maxItems);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (request.destination === 'document') {
            return caches.match('/offline') || new Response('Offline', { status: 503 });
          }
        });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'lead-submission') {
    event.waitUntil(submitPendingLeads());
  }
});

async function submitPendingLeads() {
  const cache = await caches.open('pending-leads');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
      }
    } catch (error) {
      console.error('Failed to submit lead:', error);
    }
  }
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New emergency alert from Disaster Recovery',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/check-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/close-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Disaster Recovery Alert', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/emergency')
    );
  }
});