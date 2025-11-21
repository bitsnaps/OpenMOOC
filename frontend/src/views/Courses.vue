<template>
  <div>
    <!-- HERO SECTION -->
    <div class="bg-white pb-12 sm:pb-16 lg:pb-20 pt-10 sm:pt-16 lg:pt-24 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
          Master your craft with <br class="hidden sm:block"/>
          <span class="text-indigo-600">OpenMOOC</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Build skills with courses, certificates, and degrees online from world-class universities and companies.
        </p>
        
        <!-- Action Buttons / Create Form Toggle -->
        <div class="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12" v-if="!auth.isAuthenticated">
           <router-link to="/login" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
             Get Started
           </router-link>
        </div>
      </div>
    </div>

    <!-- COURSE DASHBOARD SECTION -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Create Course (Only if Logged In) -->
      <div v-if="auth.isAuthenticated" class="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 class="text-lg font-bold text-slate-800 mb-4">🎓 Create a New Course</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <input v-model="newCourse.title" placeholder="Course Title" class="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full md:w-1/3" />
          <input v-model="newCourse.description" placeholder="Short Description" class="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full" />
          <button @click="addCourse" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition whitespace-nowrap">
            Add Course
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-slate-900">Popular Courses</h2>
        <span class="text-indigo-600 font-medium cursor-pointer hover:underline">View all</span>
      </div>

      <!-- GRID -->
      <div v-if="loading" class="text-center py-20 text-slate-400">Loading courses...</div>
      
      <div v-else class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="course in courses" :key="course.id" class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div class="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
             <span class="text-white font-bold text-3xl opacity-30">Course {{ course.id }}</span>
          </div>
          <div class="p-6 flex-grow">
            <div class="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Development</div>
            <h3 class="font-bold text-xl text-slate-900 mb-2">{{ course.title }}</h3>
            <p class="text-slate-600 text-sm line-clamp-3">{{ course.description }}</p>
          </div>
          <div class="px-6 py-4 border-t border-slate-50 bg-slate-50 flex justify-between items-center">
            <span class="text-sm text-slate-500">By Instructor</span>
            <button class="text-indigo-600 font-medium text-sm hover:text-indigo-800">Enroll Now &rarr;</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const courses = ref([])
const loading = ref(true)
const newCourse = ref({ title: '', description: '' })
const auth = useAuthStore()

const fetchCourses = async () => {
  try {
    const res = await axios.get('http://localhost:8000/courses')
    courses.value = res.data
  } catch(e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const addCourse = async () => {
  if(!newCourse.value.title || !newCourse.value.description) return;
  await axios.post('http://localhost:8000/courses', newCourse.value, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  newCourse.value = { title: '', description: '' }
  fetchCourses()
}

onMounted(fetchCourses)
</script>