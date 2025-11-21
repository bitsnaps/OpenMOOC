import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
      const params = new URLSearchParams()
      params.append('username', username)
      params.append('password', password)
      
      const res = await axios.post('http://localhost:8000/token', params)
      this.token = res.data.access_token
      localStorage.setItem('token', this.token)
    },
    
    async register(username, password) {
      // Helper to register then auto-login
      await axios.post('http://localhost:8000/register', { username, password })
      await this.login(username, password)
    },

    logout() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})