import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import Login from '../src/views/Login.vue'
import { useAuthStore } from '../src/stores/auth'

// <--- 2. Mock Vue Router so the component doesn't crash
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock
  })
}))

describe('Login.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    // Reset mocks before each test
    pushMock.mockClear()
    
    wrapper = mount(Login, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // This automatically spies on actions
            stubActions: false // Optional: set to true if you don't want real code executing
          })
        ]
      }
    })
    
    store = useAuthStore()
  })

  it('1. Renders the initial Sign In state correctly', () => {
    // Check for the new UI text we added earlier
    expect(wrapper.text()).toContain('Sign in to your account')
    
    // Check inputs exist
    expect(wrapper.find('input#username').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    
    // Check button text
    expect(wrapper.find('button[type="submit"]').text()).toBe('Sign in')
  })

  it('2. Toggles between Login and Registration modes', async () => {
    // Find the toggle link (the anchor tag in the header)
    const toggleLink = wrapper.find('a')
    
    // Click to switch to Register mode
    await toggleLink.trigger('click')
    
    expect(wrapper.text()).toContain('Create your account')
    expect(wrapper.find('button[type="submit"]').text()).toBe('Sign up')
    
    // Click back to Login mode
    await toggleLink.trigger('click')
    expect(wrapper.text()).toContain('Sign in to your account')
  })

  it('3. Calls the login action with correct data', async () => {
    // 1. Spy on the specific login action
    // Note: createTestingPinia already wrapped actions in spies
    
    // 2. Fill out the form
    await wrapper.find('input#username').setValue('testuser')
    await wrapper.find('input#password').setValue('secret123')
    
    // 3. Submit the form
    await wrapper.find('form').trigger('submit')
    
    // 4. Assert the store action was called with inputs
    expect(store.login).toHaveBeenCalledTimes(1)
    expect(store.login).toHaveBeenCalledWith('testuser', 'secret123')
    
    // 5. Note: We cannot easily test the router.push here because 
    // the login action is async. In a real unit test, we usually 
    // assert that the Store Action was called, and trust the Store logic separately.
  })
})