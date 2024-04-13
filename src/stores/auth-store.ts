import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createClient, type User } from '@supabase/supabase-js'
import type { profile } from '@/interfaces'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const userProfile = ref<profile>({ username: '', email: '' })
  const isLoggedIn = ref(false)

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )
  console.log(supabase)

  // function to login
  const login = async ({ email, password }: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  // function to prevent router from redirecting to login page before supabase is initialized
  const init = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) return null
    return data.user ? true : false
  }

  // function to logout
  const logout = async () => {
    return await supabase.auth.signOut()
  }

  // listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session ? session.user : null
    isLoggedIn.value = user.value ? true : false
    if (user.value?.id !== undefined) {
      getProfileById(user.value?.id)
    }
  })

  // function to create an account
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
      password,
      options: { data: { username, email } }
    })
  }

  // function to get user profile
  const getProfileById = async (uid: string | number) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        userProfile.value.email = data.email
        userProfile.value.username = data.username
      }
    } catch (error) {
      console.error('Error getting profile:', error)
    }
  }

  return { init, login, logout, createAccount, user, userProfile, isLoggedIn }
})
