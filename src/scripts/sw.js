import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.href.startsWith('https://www.themealdb.com/api.php'),
  new NetworkFirst({
    cacheName: 'food-api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24,
      }),
    ],
  }),
);
self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  const dataJson = event.data.json();
  const notification = {
    name: dataJson.name,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image,
    },
  };

  event.waitUntil(self.registration.showNotification(notification.title, notification.options));
});
