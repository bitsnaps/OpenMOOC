import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Courses from '../views/Courses.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Courses },
  ]
})
export default router