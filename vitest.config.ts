import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: './vitest-setup.ts',
    environment: 'node',
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['src/__integration__', 'src/__contract__'],
    globals: true,
    coverage: {
      reporter: ['lcov', 'text'],
      exclude: [
        'src/__contract__',
        'src/__integration__',
        'src/index.ts',
        'src/router.ts',
        'src/core/types.ts',
        'src/core/datadog',
        'src/core/constants',
        'src/core/http',
        'src/core/middleware',
        'src/graphql',
        'src/logger.ts',
        'src/health',
        'src/routers',
        'src/wcs',
        'src/core/openapi',
        'openapi.schema.ts',
        'response.schema.ts',
        'request.schema.ts',
        '.wrangler',
        '.yarn',
        'cli',
        '.eslintrc.js',
      ],
    },
    outputFile: 'coverage/sonar-report.xml',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
