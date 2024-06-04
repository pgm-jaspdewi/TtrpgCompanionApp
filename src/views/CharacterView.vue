<template>
  <div v-if="character === null">
    <BasePageBorders :relative="true">
      <div class="p-12 border-2 border-maroon rounded-lg bg-paleGold shadow-lg">
        <p class="text-2xl capitalize text-maroon">loading character data...</p>
      </div>
    </BasePageBorders>
  </div>
  <div v-if="character != null" class="static">
    <div class="max-w-maxWidth mx-auto my-5 flex justify-end">
      <BaseDropdown :menuTitle="user"> 
        <p class="text-xl text-darkKhaki hover:text-maroon hover:font-bold cursor-pointer border-b-2 border-darkKhaki py-2" @click="goHome">Home</p>
        <p class="text-xl text-darkKhaki hover:text-maroon hover:font-bold cursor-pointer py-2" @click="doLogout">Logout</p>

      </BaseDropdown>
    </div>
    <div
      class="absolute top-16 h-8 z-10 right-navBtnXs tabletLg:right-navBtnSm laptopSm:right-navBtnMd laptopLg:right-navBtnLg w-navButtons flex justify-between laptopSm:mr-navButtonsSpacingSm laptopLg:mr-navButtonsSpacing"
    >
      <NavButton btnContent="Character" :step="1" />
      <NavButton btnContent="Inventory" :step="2" />
      <NavButton btnContent="Spell-list" :step="3" />
      <NavButton btnContent="Manage" :step="4" />
    </div>
    <div
      class="absolute top-24 bg-paleGold w-full min-h-statsPage outline outline-2 outline-maroon z-0"
    >
      <CharacterPageBorders>
        <CharPage1 v-if="store.step === 1" :character="character" />

        <CharPage2 v-if="store.step === 2" :character="character" />

        <CharPage3 v-if="store.step === 3" />

        <ManagePage v-if="store.step === 4" :character="character" />
      </CharacterPageBorders>
    </div>
  </div>
  <BaseModal :modalActive="modal.diceThrowModal">
      <CharModal/>
  </BaseModal>
  <BaseModal :modalActive="modal.deleteModal">
      <DeleteModal />
    </BaseModal>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { BasePageBorders, BaseModal  } from '@/components/baseComponents'
import { DeleteModal } from '@/components/landingComponents'
import {
  CharacterPageBorders,
  CharModal,
  NavButton,
  CharPage1,
  CharPage2,
  CharPage3,
  ManagePage,
} from '@/components/characterPageComponents'
import { useCharPageStore } from '@/stores/characterPage-store'
import { useModalStore } from '@/stores/modal-store'
import BaseDropdown from '@/components/baseComponents/BaseDropdown.vue'
import { useAuthStore } from '@/stores/auth-store'

// get the logout function from the auth store
const { logout } = useAuthStore()

const router = useRouter()

const modal = useModalStore()
const store = useCharPageStore()
const route = useRoute()

// Get the character id from the route params
const characterId = route.params.id
const user = ref('')

// Fetch the character data from the API
const character = ref<characterDetails | null>(null)
const getCharacterData = async () => {
  // we need to get the user id first because of the row level security in the database.
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
  } else {
    user.value = data.user.user_metadata.username
    const id = data.user.id
    // get the character from the database
    const { data: charactersData, error: charactersError } = await supabase
      .from('characters')
      .select('*')
      .eq('userId', id)
      .eq('id', characterId)
      .single()
    if (charactersError) {
      console.error('Error getting characters:', charactersError.message)
    } else {
      character.value = charactersData
    }
  }
}
getCharacterData()

// Watch for changes in the charPageStore that point to unused images in the storage-bucket & remove those images when necessary
watch(() => [store.unsavedChanges , store.step], async () => {
  if (store.unsavedChanges && store.step !== 4) {
    try {
      const { error } = await supabase.storage.from('avatars').remove([store.newAvatar])
      if (error) throw error
    } catch (error) {
      console.error('Error removing image: ', (error as Error).message)
    }
  }
})

// Watch for changes in the store that indicate that the character data needs to be refreshed
watch(() => store.refreshNecessary, () => {
  getCharacterData()
})

// logout function
const doLogout = async () => {
  const { error } = await logout()
  if (error) {
    console.error('Error logging out:', error.message)
  }
  router.replace('/login')
}

// route to the landing page
const goHome = () => {
  router.push('/')
}
</script>
