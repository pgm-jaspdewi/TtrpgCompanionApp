import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref(null)
  const userProfile = ref(null)
  const isLoggedIn = ref(false)

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )
  console.log(supabase)

  const login = async ({ email, password }: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  const createAccount = async ({
    email,
    username,
    password
  }: {
    email: string
    username: string
    password: string
  }) => {
    return await supabase.auth.signUp({
      email,
      password
    })
  }

  return { login, createAccount, user, userProfile, isLoggedIn }
})
