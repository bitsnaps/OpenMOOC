<template>
  <div class="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
    
    <!-- Header Section -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo Icon -->
      <div class="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
        <span class="text-white font-bold text-2xl">M</span>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
        {{ isRegistering ? 'Create your account' : 'Sign in to your account' }}
      </h2>
      <p class="mt-2 text-center text-sm text-slate-600">
        Or
        <a href="#" @click.prevent="toggleMode" class="font-medium text-indigo-600 hover:text-indigo-500 transition">
          {{ isRegistering ? 'sign in to existing account' : 'start your 14-day free trial' }}
        </a>
      </p>
    </div>

    <!-- Form Card -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl shadow-slate-200 sm:rounded-lg sm:px-10 border border-slate-100">
        
        <!-- Error Alert -->
        <div v-if="error" class="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          
          <!-- Username Input -->
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700">Username</label>
            <div class="mt-1">
              <input 
                id="username" 
                v-model="username" 
                required 
                type="text" 
                class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition" 
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
            <div class="mt-1">
              <input 
                id="password" 
                v-model="password" 
                required 
                type="password" 
                class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition" 
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isRegistering ? 'Sign up' : 'Sign in' }}
            </button>
          </div>
        </form>

        <!-- Social Login Mockup (Visual only) -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with GitHub</span>
                GitHub
              </a>
            </div>
            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Google</span>
                Google
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const isRegistering = ref(false)
const error = ref('')
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  error.value = ''
  username.value = ''
  password.value = ''
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (isRegistering.value) {
      await auth.register(username.value, password.value)
    } else {
      await auth.login(username.value, password.value)
    }
    router.push('/')
  } catch (e) {
    // Basic error handling
    if (e.response && e.response.status === 400) {
      error.value = isRegistering.value ? "Username already exists." : "Invalid credentials."
    } else {
      error.value = "Something went wrong. Please try again."
    }
  } finally {
    loading.value = false
  }
}
</script>