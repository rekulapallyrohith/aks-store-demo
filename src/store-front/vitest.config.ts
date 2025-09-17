import { defineConfig, mergeConfig } from 'vitest/config'
import baseViteConfig from './vite.config'

// Extend the existing Vite config
export default mergeConfig(
  baseViteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: ['e2e/**', 'node_modules/**'],
      globals: true
    }
  })
)

