// necessary imports to run the app
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth-store'

// create the app instance
const app = createApp(App)
// create a pinia instance
const pinia = createPinia()
// use the pinia instance
app.use(pinia)
// Without this function call, the router will trigger before the supabase client is initialized.
// This will cause the router to redirect to the login page because there is no user logged in according to the auth store.
// This function call ensures that the supabase client is initialized before the router is triggered, to avoid the redirect.
await useAuthStore().init()
// use the router (for app-navigation)
app.use(router)

// mount the app to the DOM
app.mount('#app')
