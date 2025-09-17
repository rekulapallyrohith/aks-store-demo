import { expect, vi } from 'vitest'
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Stub router-link so Vue doesn't complain
config.global.stubs = {
  RouterLink: {
    template: '<a><slot /></a>',
  },
}

// Automatically mock Pinia stores in tests
config.global.plugins = [
  createTestingPinia({
    createSpy: vi.fn,
  }),
]

// Optional: extend expect here if needed
expect.extend({})
