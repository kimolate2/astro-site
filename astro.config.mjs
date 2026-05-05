// @ts-check

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig, fontProviders } from 'astro/config';

const isProduction = process.env.NODE_ENV === 'production';
const general = JSON.parse(readFileSync('./src/content/settings/general.json', 'utf-8'));
const activeTheme = general.theme || 'default';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-site.leimingkai789.workers.dev',
  adapter: isProduction ? cloudflare() : undefined,
  integrations: [mdx(), sitemap()],

  vite: {
    resolve: {
      alias: {
        '@theme': resolve(`./src/themes/${activeTheme}`),
      },
    },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
});