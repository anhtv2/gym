import { defineStore } from 'pinia'
import { postLogin } from '@/api/auth'
import router from '@/router'
import { LoginRequest, UserInfo } from '@/api/auth/interfaces/login'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    currentUser: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    returnUrl: null,
  }),
  actions: {
    async login(request: LoginRequest) {
      const response = await postLogin(request)

      this.token = response.access_token
      this.currentUser = JSON.stringify(response.user)
      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))

      router.push({ name: 'dashboard' })
    },
    logout() {
      this.token = null
      this.currentUser = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push({ name: 'login' })
    },
  },
})
