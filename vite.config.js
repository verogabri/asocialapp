import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// import wayfinder from 'wayfinder';  // ❌ Pacchetto non installato
import { wayfinder } from '@laravel/vite-plugin-wayfinder';


export default defineConfig({
    plugins: [
        wayfinder(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic' // nice to have
        // loader: 'tsx',
        // include: /resources\/js\/.*\.tsx?$/,
        // exclude: [],
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});

