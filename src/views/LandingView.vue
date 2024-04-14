<!-- Script tag goes here -->
<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth-store'
import { FaPowerOff } from 'vue3-icons/fa'
import { useRouter } from 'vue-router'
import CharacterCard from '@/components/CharacterCard.vue'

const router = useRouter()

const { user, userProfile, logout } = useAuthStore()

const doLogout = async () => {
  const { error } = await logout()
  router.replace('/login')
}

const characterTest = {
  image: 'https://static.wikia.nocookie.net/battlechasersnightwar_gamepedia/images/7/7b/Gully.png/',
  name: 'Gully',
  race: 'Halfling',
  level: 1,
  class: 'Monk'
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
        <div>
          <div class="flex flex-col items-center">
            <h1 class="text-4xl laptopSm:text-5xl text-maroon border-b-3 p-1 font-title font-bold">
              Welcome, {{ userProfile?.username }}
            </h1>
            <h3 class="text-md">Select a character or create a new one</h3>
          </div>
          <CharacterCard :character="characterTest" />
          <CharacterCard :character="characterTest" />
          <CharacterCard :character="characterTest" />
          <RouterLink to="/login" class=""> Go to Login </RouterLink>
          <AppButton @click="doLogout" btnContent="Logout">
            <FaPowerOff class="fill-maroon group-hover:fill-lightKaki w-4 h-4" />
          </AppButton>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- Style tag goes here -->
