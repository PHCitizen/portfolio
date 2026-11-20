import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig(({ command, mode }) => ({
  // Keep the default Node build; the Pages build uses Nitro's legacy Pages preset.
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({
      rollupConfig: { external: [/^@sentry\//] },
      ...(command === 'build' && mode === 'pages'
        ? {
            preset: 'cloudflare-pages',
            compatibilityDate: '2025-09-01',
            cloudflare: { wrangler: { name: 'jayveeembog' } },
          }
        : {}),
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}))

export default config
