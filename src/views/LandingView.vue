<!-- Script tag goes here -->
<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth-store'
import { FaPowerOff } from 'vue3-icons/fa'
import { useRouter } from 'vue-router'

const router = useRouter()

const { user, userProfile, logout } = useAuthStore()

const doLogout = async () => {
  const { error } = await logout()
  router.replace('/login')
}
</script>

<!-- Template tag goes here -->
<template>
  <main class="flex items-center">
    <div
      class="border-2 border-silverChalice w-outerContainer h-outerContainer my-outerContainer m-auto rounded-lg"
    >
      <div
        class="border-2 border-silverChalice w-innerContainer h-innerContainer m-innerContainer rounded-lg p-4 flex justify-center items-center"
      >
        <div class="flex flex-col">
          <h2>{{ userProfile?.username }}</h2>
          <RouterLink to="/login" class="text-blue-500 underline"> Go to Login </RouterLink>
          <AppButton @click="doLogout" btnContent="Logout">
            <FaPowerOff class="fill-maroon group-hover:fill-lightKaki w-4 h-4" />
          </AppButton>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- Style tag goes here -->
