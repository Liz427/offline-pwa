const CACHE_NAME = 'todo-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './images/icon-128.png',
    './images/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Abriendo caché...');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker Activado.')
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                return res || fetch(event.request);
            })
    );
})
