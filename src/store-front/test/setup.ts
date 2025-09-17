import { expect } from 'vitest'
import { config } from '@vue/test-utils'

// Stub router-link so Vue doesn't complain
config.global.stubs = {
  RouterLink: {
    template: '<a><slot /></a>',
  },
}

// Optional: extend expect here if needed
expect.extend({})
