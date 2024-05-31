<template>
  <div class="h-form flex flex-col justify-between">
    <div>
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
              <div class="border-2 border-darkKhaki rounded-lg w-12 flex justify-center">
                <p class="text-sm">{{ store.characterInfo.charStats.str }}</p>
              </div>
            </div>
            <div class="flex items-center my-1">
              <p class="text-sm uppercase pr-2">Dex</p>
              <div class="border-2 border-darkKhaki rounded-lg w-12 flex justify-center">
                <p class="text-sm">{{ store.characterInfo.charStats.dex }}</p>
              </div>
            </div>
            <div class="flex items-center my-1">
              <p class="text-sm uppercase pr-2">Con</p>
              <div class="border-2 border-darkKhaki rounded-lg w-12 flex justify-center">
                <p class="text-sm">{{ store.characterInfo.charStats.con }}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center my-1">
              <p class="text-sm uppercase pr-2">Int</p>
              <div class="border-2 border-darkKhaki rounded-lg w-12 flex justify-center">
                <p class="text-sm">{{ store.characterInfo.charStats.int }}</p>
              </div>
            </div>
            <div class="flex items-center my-1">
              <p class="text-sm uppercase pr-2">Wis</p>
              <div class="border-2 border-darkKhaki rounded-lg w-12 flex justify-center">
                <p class="text-sm">{{ store.characterInfo.charStats.wis }}</p>
              </div>
            </div>
            <div class="flex items-center my-1">
              <p class="text-sm uppercase pr-2">Cha</p>
              <div class="border-2 border-darkKhaki rounded-lg w-12 flex justify-center">
                <p class="text-sm">{{ store.characterInfo.charStats.cha }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- divs with proficiencies -->
      <div class="flex flex-row items-start justify-start">
        <div
          class="border-2 border-maroon p-2 mt-2 mb-4 mr-1 rounded-lg flex flex-col items-center justify-center w-4/12 laptopSm:w-6/12"
        >
          <p class="text-maroon font-bold">Skill proficiencies</p>
          <ul class="laptopSm:w-full flex flex-wrap justify-center">
            <li
              v-for="skill in store.characterInfo.skillProficiencies"
              :key="skill"
              class="text-sm border-2 border-darkKhaki rounded-lg p-1 m-1 flex justify-center w-32 laptopSm:w-5/12"
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
              class="text-sm border-2 border-darkKhaki rounded-lg p-1 m-1 flex justify-center w-32 laptopSm:w-5/12"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <WizardNav navType="last" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { BaseImage } from '@/components/baseComponents'
import WizardNav from './WizardNav.vue'
import { useWizardStore } from '@/stores/wizard-store'
import { ref } from 'vue'
import { supabase } from '@/supabase'
import type { savingThrows, equipment } from '@/interfaces'
import axios from 'axios'

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

const items = [...store.characterInfo.selectedEquipment, ...store.characterInfo.standardEquipment]

//  seperate weapons from other equipment
const apiWeaponList = ref<savingThrows[]>([])
const characterWeaponList = ref<equipment[]>([])
const characterEquipment = ref<equipment[]>([])

// Fetch the necessary data for the character page and it's components
const setupFunction = async () => {
  // get list of weapons from the API
  const fetchMeleeWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/melee-weapons'
  )
  const fetchRangedWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/ranged-weapons'
  )
  apiWeaponList.value = [...fetchMeleeWeapons.data.equipment, ...fetchRangedWeapons.data.equipment]
  const filteredWeapons = items.filter((equipment) =>
    apiWeaponList.value.some((weapon) => equipment.item === weapon.name)
  )
  const otherEquipment = items.filter(
    (equipment) => !apiWeaponList.value.some((weapon) => equipment.item === weapon.name)
  )
  characterWeaponList.value = filteredWeapons
  characterEquipment.value = otherEquipment
  console.log(characterWeaponList.value)
}
setupFunction()

const handleSubmit = async () => {
  // Save the character to the database
  store.submitCharacter(characterEquipment.value, characterWeaponList.value)
}
</script>
