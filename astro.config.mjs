// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://modozen.cr',
  i18n: {
    locales: ['es-CR', { path: 'en', codes: ['en-US', 'en'] }],
    defaultLocale: 'es-CR',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});