<template>
  <div class="mt-3 flex justify-center">
    <h1 class="text-xl font-bols text-maroon">Overview</h1>
  </div>
  <div class="flex flex-col laptopSm:flex-row items-center justify-center">
    <!-- div with character details -->
    <div
      class="border-2 border-maroon p-2 mt-2 mb-1 rounded-lg flex items-center w-8/12 laptopSm:w-6/12 laptopSm:mr-1 laptopSm:h-28"
    >
      <BaseImage :src="src" :size="6" />
      <div class="pl-2">
        <div class="flex">
          <p class="text-sm font-bold text-maroon pr-1">Name:</p>
          <p class="text-sm">{{ store.characterInfo.charName }}</p>
        </div>
        <div class="flex">
          <p class="text-sm font-bold text-maroon pr-1">Race:</p>
          <p class="text-sm">{{ store.characterInfo.charRace }}</p>
        </div>
        <div class="flex">
          <p class="text-sm font-bold text-maroon pr-1">Class:</p>
          <p class="text-sm">{{ store.characterInfo.charClass }}</p>
        </div>
        <div class="flex">
          <p class="text-sm font-bold text-maroon pr-1">Background:</p>
          <p class="text-sm">{{ store.characterInfo.charBackground }}</p>
        </div>
      </div>
    </div>
    <!-- div with stats -->
    <div
      class="border-2 border-maroon px-2 my-1 laptopSm:mt-2 rounded-lg flex justify-around items-center w-8/12 laptopSm:w-6/12 laptopSm:ml-1 laptopSm:h-28"
    >
      <div class="flex flex-col">
        <div class="flex items-center my-1">
          <p class="text-sm uppercase pr-2">Str</p>
          <div class="border-2 border-maroon rounded-lg w-12 flex justify-center">
            <p class="text-sm">{{ store.characterInfo.charStats.str }}</p>
          </div>
        </div>
        <div class="flex items-center my-1">
          <p class="text-sm uppercase pr-2">Dex</p>
          <div class="border-2 border-maroon rounded-lg w-12 flex justify-center">
            <p class="text-sm">{{ store.characterInfo.charStats.dex }}</p>
          </div>
        </div>
        <div class="flex items-center my-1">
          <p class="text-sm uppercase pr-2">Con</p>
          <div class="border-2 border-maroon rounded-lg w-12 flex justify-center">
            <p class="text-sm">{{ store.characterInfo.charStats.con }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center my-1">
          <p class="text-sm uppercase pr-2">Int</p>
          <div class="border-2 border-maroon rounded-lg w-12 flex justify-center">
            <p class="text-sm">{{ store.characterInfo.charStats.int }}</p>
          </div>
        </div>
        <div class="flex items-center my-1">
          <p class="text-sm uppercase pr-2">Wis</p>
          <div class="border-2 border-maroon rounded-lg w-12 flex justify-center">
            <p class="text-sm">{{ store.characterInfo.charStats.wis }}</p>
          </div>
        </div>
        <div class="flex items-center my-1">
          <p class="text-sm uppercase pr-2">Cha</p>
          <div class="border-2 border-maroon rounded-lg w-12 flex justify-center">
            <p class="text-sm">{{ store.characterInfo.charStats.cha }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- divs with proficiencies -->
  <div class="flex flex-row items-center justify-center">
    <div
      class="border-2 border-maroon p-2 mt-2 mb-4 mr-1 rounded-lg flex flex-col items-center justify-center w-4/12 laptopSm:w-6/12"
    >
      <p class="text-maroon font-bold">Skill proficiencies</p>
      <ul class="laptopSm:w-full flex flex-wrap justify-center">
        <li
          v-for="skill in store.characterInfo.skillProficiencies"
          :key="skill"
          class="text-sm border-2 border-maroon rounded-lg p-1 m-1 flex justify-center w-32 laptopSm:w-5/12"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
    <div
      class="border-2 border-maroon p-2 mt-2 mb-4 ml-1 rounded-lg flex flex-col items-center justify-center w-4/12 laptopSm:w-6/12"
    >
      <p class="text-maroon font-bold">Languages</p>
      <ul class="laptopSm:w-full flex flex-wrap justify-center">
        <li
          v-for="skill in store.characterInfo.languageProficiencies"
          :key="skill"
          class="text-sm border-2 border-maroon rounded-lg p-1 m-1 flex justify-center w-32 laptopSm:w-5/12"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>

  <form @submit.prevent="handleSubmit">
    <WizardNav navType="last" />
  </form>
</template>

<script setup lang="ts">
import WizardNav from './WizardNav.vue'
import { useWizardStore } from '@/stores/wizard-store'
import { ref } from 'vue'
import { supabase } from '../supabase'
import BaseImage from './BaseImage.vue'

const store = useWizardStore()

// const to hold the image source once downloaded
const src = ref('')
const downloadImage = async () => {
  // Download the avatar-image from the storage-bucket to show in the UI
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(store.characterInfo.charAvatar)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', (error as Error).message)
  }
}
// Call the downloadImage function when the component is mounted
downloadImage()

// spells & cantrips are saved as their index in the array (lowercase, "-" between the words),
// so we need to convert them to their actual name
// const spells = ref<string[]>([])
// const cantrips = ref<string[]>([])
// for (const spell of store.characterInfo.selected1stLvlSpells) {
//   const changed = spell.replace(/-/g, ' ')
//   spells.value.push(changed)
// }
// for (const cantrip of store.characterInfo.selectedCantrips) {
//   const changed = cantrip.replace(/-/g, ' ')
//   cantrips.value.push(changed)
// }

const handleSubmit = async () => {
  // Save the character to the database
  console.log('Submitting character...')
  store.submitCharacter()
}
</script>
