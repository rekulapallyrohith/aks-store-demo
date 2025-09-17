import { defineConfig, mergeConfig } from 'vitest/config'
import type { UserConfig } from 'vite'
import baseViteConfig from './vite.config'

const vitestConfig: UserConfig = defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['e2e/**', 'node_modules/**'],
    globals: true
  }
})

export default mergeConfig(baseViteConfig, vitestConfig)
