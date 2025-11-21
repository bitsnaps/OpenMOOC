import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import Login from 'Login.vue'

describe('Login.vue', () => {
  it('renders login form', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    expect(wrapper.text()).toContain('Login')
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })
})