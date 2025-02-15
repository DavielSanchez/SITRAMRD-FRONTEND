import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'SITRAMRD',
                short_name: 'Sitramrd',
                description: 'PWA de SitramRd',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [{
                    src: '/public/vite.svg',
                    sizes: '192x192',
                    type: 'image/svg+xml',
                }],
            },
            workbox: {
                runtimeCaching: [{
                    urlPattern: ({ request }) => request.destination === 'image',
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
                        },
                    },
                }, ],
            },
        }),
    ],
});

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })