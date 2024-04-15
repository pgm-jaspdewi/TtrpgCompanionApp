<!-- Script tag goes here -->
<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth-store'
import { FaPowerOff } from 'vue3-icons/fa'
import { useRouter } from 'vue-router'
import CharacterCard from '@/components/CharacterCard.vue'

const router = useRouter()

const { userProfile, logout } = useAuthStore()

const doLogout = async () => {
  const { error } = await logout()
  router.replace('/login')
}

const characterTest = [
  {
    id: 1,
    image:
      'https://static.wikia.nocookie.net/battlechasersnightwar_gamepedia/images/7/7b/Gully.png/',
    name: 'Gully',
    race: 'Halfling',
    level: 1,
    class: 'Monk'
  },
  {
    id: 2,
    image:
      'https://static.wikia.nocookie.net/battlechasersnightwar_gamepedia/images/5/52/Garrison.png/',
    name: 'Garrison',
    race: 'Human',
    level: 1,
    class: 'Fighter'
  }
]
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
          <ul class="flex flex-col items-center">
            <li class="list-none" v-for="character in characterTest" :key="character.id">
              <CharacterCard :character="character" />
            </li>
          </ul>
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
