<!-- Template tag-->
<template>
  <main class="flex items-center">
    <BasePageBorders :relative="true">
      <div>
        <!-- Title & subtitle -->
        <div class="flex flex-col items-center pb-5">
          <h1 class="text-3xl tablet:text-4xl laptopSm:text-5xl text-maroon border-b-3 p-1 font-title font-bold mt-3 tablet:mt-0">
            Welcome, {{ userProfile?.username }}
          </h1>
          <h2 class="text-md laptopSm:text-xl">Select a character or create a new one</h2>
        </div>

        <!-- Character list -->
        <ul class="flex flex-col items-center">
          <li class="list-none" v-for="character in characters" :key="character.id">
            <CharacterCard :character="character" />
          </li>
        </ul>

        <!-- Create character buttons -->
        <div class="flex items-center justify-center ">
          <BaseButton @click="createCharacter" btnContent="Create new Character" class="mt-5 tablet:hidden">
            <FaUserPlus class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
          </BaseButton>
          <BaseButtonBig @click="createCharacter" btnContent="Create new Character" class="mt-5 hidden tablet:inline-block">
            <FaUserPlus class="fill-maroon group-hover:fill-lightKhaki w-5 h-5" />
          </BaseButtonBig>
        </div>
        
        

        <!-- logout button -->
        <button
          @click="doLogout"
          class="absolute top-5 right-5 w-10 h-10 border-1 border-maroon rounded-full group flex justify-center items-center hover:bg-maroon"
        >
          <FaPowerOff class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </button>
      </div>
    </BasePageBorders>
    <BaseModal :modalActive="modal.deleteModal">
      <DeleteModal />
    </BaseModal>
  </main>
</template>

<!-- Script tag -->
<script setup lang="ts">
import { BasePageBorders, BaseButtonBig, BaseModal, BaseButton } from '@/components/baseComponents'
import { DeleteModal } from '@/components/landingComponents'
import { useAuthStore } from '@/stores/auth-store'
import { FaPowerOff, FaUserPlus } from 'vue3-icons/fa6'
import { useRouter } from 'vue-router'
import CharacterCard from '@/components/landingComponents/CharacterCard.vue'
import { ref, watch } from 'vue'
import { supabase } from '@/supabase'
import type { characterDetails } from '@/interfaces'
import { useCharListStore } from '@/stores/charList-store'
import { useModalStore } from '@/stores/modal-store'

const modal = useModalStore()
const store = useCharListStore()

const router = useRouter()

// get the user profile and logout function from the auth store
const { userProfile, logout } = useAuthStore()

// logout function
const doLogout = async () => {
  const { error } = await logout()
  if (error) {
    console.error('Error logging out:', error.message)
  }
  router.replace('/login')
}

// route to the character creation wizard
const createCharacter = () => {
  router.push('/characterWizard')
}

const characters = ref<characterDetails[]>([])
// Get the user & characters data from the supabase database.
const getUser = async () => {
  // Vue is peculiar about awaits in the setup function, so we need to wrap the call in an IIFE.
  // This way, we can use await in the IIFE without Vue complaining.
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
  } else {
    const id = data.user.id
    // get the characters from the database
    const { data: charactersData, error: charactersError } = await supabase
      .from('characters')
      .select('*')
      .eq('userId', id)
    if (charactersError) {
      console.error('Error getting characters:', charactersError.message)
    } else {
      characters.value = charactersData
    }
  }
}
getUser()

// watch for changes in the store to update the character list when the list of characters has been altered.
watch(store, () => {
  if (store.characterListWasAltered) {
    getUser()
    store.characterListWasAltered = false
  }
})
</script>
