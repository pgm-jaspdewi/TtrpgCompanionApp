<!-- Template tag-->
<template>
  <main class="flex items-center">
    <BasePageBorders :relative="true">
      <div>
        <!-- Title & subtitle -->
        <div class="flex flex-col items-center pb-5">
          <h1 class="text-4xl laptopSm:text-5xl text-maroon border-b-3 p-1 font-title font-bold">
            Welcome, {{ userProfile?.username }}
          </h1>
          <h2 class="text-md laptopSm:text-xl">Select a character or create a new one</h2>
        </div>

        <!-- Character list -->
        <ul class="flex flex-col items-center">
          <li class="list-none" v-for="character in characterTest" :key="character.id">
            <CharacterCard :character="character" />
          </li>
        </ul>

        <!-- Create character button -->
        <BaseButtonBig @click="createCharacter" btnContent="Create new Character" class="mt-5">
          <FaUserPlus class="fill-maroon group-hover:fill-lightKhaki w-5 h-5" />
        </BaseButtonBig>

        <!-- logout button -->
        <BaseButton @click="doLogout" btnContent="Logout" class="absolute top-5 right-5">
          <FaPowerOff class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButton>
      </div>
    </BasePageBorders>
  </main>
</template>

<!-- Script tag -->
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { useAuthStore } from '@/stores/auth-store'
import { FaPowerOff, FaUserPlus } from 'vue3-icons/fa6'
import { useRouter } from 'vue-router'
import CharacterCard from '@/components/CharacterCard.vue'
import BasePageBorders from '@/components/BasePageBorders.vue'
import BaseButtonBig from '@/components/BaseButtonBig.vue'

const router = useRouter()

const { userProfile, logout } = useAuthStore()

const doLogout = async () => {
  const { error } = await logout()
  router.replace('/login')
}

const createCharacter = () => {
  router.push('/characterWizard')
}

// temporary test-data
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
  },
  {
    id: 3,
    image:
      'https://static.wikia.nocookie.net/battlechasersnightwar_gamepedia/images/4/45/Calibretto_%28transparent%29.png/',
    name: 'Calibretto',
    race: 'Warforged',
    level: 1,
    class: 'Cleric'
  },
  {
    id: 4,
    image:
      'https://static.wikia.nocookie.net/battlechasersnightwar_gamepedia/images/2/29/Monika.png/',
    name: 'Red Monika',
    race: 'Human',
    level: 1,
    class: 'Rogue'
  }
]
</script>
