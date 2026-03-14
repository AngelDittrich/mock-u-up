// Service Worker for GYMTTRICH PWA
// Version: 2.0.0

const CACHE_VERSION = 'v2.2.1';
const CACHE_NAME = `gymttrich-${CACHE_VERSION}`;
const CACHE_DYNAMIC = `gymttrich-dynamic-${CACHE_VERSION}`;
const CACHE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
const CACHE_DYNAMIC_LIMIT = 50; // Max items in dynamic cache

// Core assets to cache on install
const CORE_ASSETS = [
    '/GYMTTRICHv2/',
    '/GYMTTRICHv2/index.html',
    '/GYMTTRICHv2/dashboard.html',
    '/GYMTTRICHv2/manifest.json',

    // CSS
    '/GYMTTRICHv2/css/styles.css',
    '/GYMTTRICHv2/css/splash.css',
    '/GYMTTRICHv2/css/assets/logo.jpeg',
    '/GYMTTRICHv2/css/assets/logo-pwa.png',
    '/GYMTTRICHv2/css/assets/logo-pwa-maskable.png',
    '/GYMTTRICHv2/js/entries/forms.css',

    // Core JS modules
    '/GYMTTRICHv2/js/main.js',
    '/GYMTTRICHv2/js/db.js',
    '/GYMTTRICHv2/js/dashboard.js',
    '/GYMTTRICHv2/js/user.js',
    '/GYMTTRICHv2/js/profile-view.js',
    '/GYMTTRICHv2/js/strength.js',
    '/GYMTTRICHv2/js/calisthenics.js',
    '/GYMTTRICHv2/js/measurements.js',
    '/GYMTTRICHv2/js/tips.js',
    '/GYMTTRICHv2/js/backup-manager.js',
    '/GYMTTRICHv2/js/entries/entries-view.js',
];

// External resources (CDN) - cache separately
const EXTERNAL_RESOURCES = [
    'https://fonts.googleapis.com/css2',
    'https://unpkg.com/@phosphor-icons/web',
    'https://cdn.jsdelivr.net/npm/chart.js',
];

// ============================================================================
// INSTALL EVENT - Pre-cache core assets
// ============================================================================
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker version:', CACHE_VERSION);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching core assets...');
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => {
                console.log('[SW] Core assets cached successfully');
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache core assets:', error);
            })
    );
});

// ============================================================================
// ACTIVATE EVENT - Clean up old caches
// ============================================================================
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker version:', CACHE_VERSION);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Delete any cache that doesn't match current version
                            return cacheName.startsWith('gymttrich-') &&
                                cacheName !== CACHE_NAME &&
                                cacheName !== CACHE_DYNAMIC;
                        })
                        .map((cacheName) => {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Service Worker activated and ready');
                // Take control of all pages immediately
                return self.clients.claim();
            })
    );
});

// ============================================================================
// FETCH EVENT - Handle requests with smart caching strategies
// ============================================================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome extensions and other protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Strategy selection based on request type
    if (isCoreAsset(request.url)) {
        // Cache-First for core assets
        event.respondWith(cacheFirst(request));
    } else if (isExternalResource(request.url)) {
        // Stale-While-Revalidate for external resources
        event.respondWith(staleWhileRevalidate(request));
    } else if (isAPIRequest(request.url)) {
        // Network-First for API/data requests
        event.respondWith(networkFirst(request));
    } else {
        // Cache-First with dynamic caching for everything else
        event.respondWith(cacheFirstDynamic(request));
    }
});

// ============================================================================
// CACHING STRATEGIES
// ============================================================================

/**
 * Cache-First Strategy
 * Returns cached response if available, otherwise fetches from network
 */
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('[SW] Cache-First fetch failed:', error);
        return offlineFallback(request);
    }
}

/**
 * Cache-First with Dynamic Caching
 * Same as Cache-First but stores in dynamic cache
 */
async function cacheFirstDynamic(request) {
    const cache = await caches.open(CACHE_DYNAMIC);
    const cached = await cache.match(request);

    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        if (response.ok) {
            // Clone and cache the response
            const responseClone = response.clone();
            cache.put(request, responseClone);

            // Limit dynamic cache size
            limitCacheSize(CACHE_DYNAMIC, CACHE_DYNAMIC_LIMIT);
        }
        return response;
    } catch (error) {
        console.error('[SW] Dynamic cache fetch failed:', error);
        return offlineFallback(request);
    }
}

/**
 * Network-First Strategy
 * Tries network first, falls back to cache if offline
 */
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_DYNAMIC);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cached = await caches.match(request);
        return cached || offlineFallback(request);
    }
}

/**
 * Stale-While-Revalidate Strategy
 * Returns cached response immediately, updates cache in background
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_DYNAMIC);
    const cached = await cache.match(request);

    const fetchPromise = fetch(request)
        .then((response) => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached);

    return cached || fetchPromise;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if request is for a core asset
 */
function isCoreAsset(url) {
    return CORE_ASSETS.some(asset => url.includes(asset));
}

/**
 * Check if request is for an external resource
 */
function isExternalResource(url) {
    return EXTERNAL_RESOURCES.some(resource => url.includes(resource));
}

/**
 * Check if request is an API call
 */
function isAPIRequest(url) {
    return url.includes('/api/') || url.includes('data.json');
}

/**
 * Limit cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > maxItems) {
        // Remove oldest entries (FIFO)
        const keysToDelete = keys.slice(0, keys.length - maxItems);
        await Promise.all(keysToDelete.map(key => cache.delete(key)));
    }
}

/**
 * Offline fallback response
 */
function offlineFallback(request) {
    const url = new URL(request.url);

    // Return offline page for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
        return caches.match('/GYMTTRICHv2/index.html');
    }

    // Return generic offline response for other requests
    return new Response(
        JSON.stringify({
            error: 'Offline',
            message: 'No internet connection available'
        }),
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
    );
}

// ============================================================================
// MESSAGE HANDLER - For cache management from main thread
// ============================================================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});
// ============================================================================
// PUSH & NOTIFICATIONS
// ============================================================================

self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event.notification.tag);

    event.notification.close();

    // Focus on existing window or open new one
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            // If there's an open window, focus it
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        return clientList[i].focus();
                    }
                }
                return client.focus();
            }
            // Otherwise open a new one
            return clients.openWindow('/GYMTTRICHv2/dashboard.html');
        })
    );
});

// Placeholder for future Push Server integration
self.addEventListener('push', (event) => {
    console.log('[SW] Push received');
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/GYMTTRICHv2/css/assets/logo-pwa.png',
            badge: '/GYMTTRICHv2/css/assets/logo-pwa-maskable.png',
            data: { url: data.url || '/GYMTTRICHv2/dashboard.html' }
        };
        event.waitUntil(
            self.registration.showNotification(data.title || 'New Alert', options)
        );
    }
});
