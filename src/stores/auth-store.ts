import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref(null)
  const userProfile = ref(null)
  const isLoggedIn = ref(false)

  const login = async ({ username, password }) => {
    return null
  }

  const createAccount = async ({ email, username, password }) => {
    return null
  }

  return { login, createAccount, user, userProfile, isLoggedIn }
})
