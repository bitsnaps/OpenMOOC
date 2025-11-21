<template>
  <div class="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
    
    <!-- NAVIGATION BAR -->
    <nav class="fixed w-full z-50 top-0 transition-all duration-300" 
         :class="scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-white border-b border-transparent'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center cursor-pointer" @click="router.push('/')">
            <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="font-bold text-xl tracking-tight text-slate-800">
              Talent<span class="text-indigo-600">Campus</span>
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-8 items-center">
            <router-link to="/" class="text-slate-600 hover:text-indigo-600 font-medium transition">Catalog</router-link>
            <a href="#" class="text-slate-600 hover:text-indigo-600 font-medium transition">Mentors</a>
            <a href="#" class="text-slate-600 hover:text-indigo-600 font-medium transition">Pricing</a>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <template v-if="!auth.isAuthenticated">
              <router-link to="/login" class="text-slate-600 hover:text-indigo-600 font-medium">
                Log in
              </router-link>
              <router-link to="/login" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Started
              </router-link>
            </template>
            
            <template v-else>
              <span class="text-sm text-slate-500 hidden md:block">Welcome back!</span>
              <button @click="handleLogout" class="border border-slate-300 hover:border-red-400 hover:text-red-500 text-slate-600 px-4 py-2 rounded-full font-medium transition">
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="flex-grow pt-16">
      <!-- Router View with Fade Transition -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- FOOTER -->
    <footer class="bg-slate-900 text-slate-300 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <span class="font-bold text-xl text-white">TalentCampus</span>
          <p class="mt-4 text-slate-400 max-w-xs">
            Empowering developers worldwide with open access to top-tier education and community-driven content.
          </p>
        </div>
        <div>
          <h3 class="text-white font-semibold uppercase tracking-wider mb-4">Platform</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition">Browse Courses</a></li>
            <li><a href="#" class="hover:text-white transition">Become an Instructor</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold uppercase tracking-wider mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
        TalentCampus &copy; {{ new Date().getFullYear()}}  Inc. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const scrolled = ref(false)

// Handle scroll for navbar effect
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style>
/* Smooth Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>