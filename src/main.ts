// necessary imports to run the app
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// create a pinia instance
const pinia = createPinia()
// create the app instance
const app = createApp(App)

// use the router (for app-navigation) and pinia (for state-management)
app.use(router)
app.use(pinia)

// mount the app to the DOM
app.mount('#app')
