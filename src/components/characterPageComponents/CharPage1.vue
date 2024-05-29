<template>
  <div class="max-w-maxWidth mx-auto">
    <!-- top row -->
    <div class="mb-4 flex flex-col laptopLg:flex-row justify-between">
      <!-- avatar + basic info -->
      <div
        class="m-2 border-2 border-darkKhaki rounded-lg w-10/12 laptopSm:w-7/12 laptopLg:w-4/12 flex items-start justify-between shadow-lg"
      >
        <div class="flex">
          <BaseImage :src="src" :size="8" class="m-2" />
          <div class="m-2 flex flex-col justify-between h-32">
            <h2 class="text-3xl laptopLg:text-2xl font-bold text-maroon">{{ character.name }}</h2>
            <div class="flex justify-between">
              <p class="text-2xl laptopLg:text-xl capitalize mr-4">{{ character.race }}</p>
              <p class="text-2xl laptopLg:text-xl capitalize">{{ character.class }}</p>
            </div>
            <p class="text-2xl laptopLg:text-xl capitalize">level {{ character.level }}</p>
          </div>
        </div>
        <BaseButtonBig class="m-2 laptopLg:hidden" btnContent="Lvl up">
          <FaArrowUp class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButtonBig>

        <BaseButton class="m-2 hidden laptopLg:flex" btnContent="Lvl up">
          <FaArrowUp class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButton>
      </div>

      <!-- Stats -->
      <div
        class="m-2 rounded-lg laptopLg:w-7/12 flex justify-center items-start h-36 shadow-lg bg-maroon/50"
      >
        <CharStat :title="'str'" :stat="parseInt(character.stats.str)" />
        <CharStat :title="'dex'" :stat="parseInt(character.stats.dex)" />
        <CharStat :title="'con'" :stat="parseInt(character.stats.con)" />
        <CharStat :title="'int'" :stat="parseInt(character.stats.int)" />
        <CharStat :title="'wis'" :stat="parseInt(character.stats.wis)" />
        <CharStat :title="'cha'" :stat="parseInt(character.stats.cha)" />
      </div>
    </div>
    <!-- columns -->
    <div class="flex flex-col laptopSm:flex-row justify-between w-full">
      <!-- first two colums -->
      <div class="flex w-full laptopSm:w-8/12 mb-3">
        <!-- first column -->
        <div class="w-6/12 laptopSm:w-5/12 flex flex-col">
          <!-- saving throws -->
          <div
            class="mx-2 mt-1 p-1 border-2 border-darkKhaki rounded-lg flex flex-col items-center shadow-lg"
          >
            <h3 class="font-bold text-lg text-maroon">Saving Throws</h3>
            <div v-if="classData" class="flex w-full">
              <div class="w-1/2 p-2">
                <SavingThrow
                  :saves="classData.saving_throws"
                  :stat="parseInt(character.stats.str)"
                  name="str"
                  :proficiencyBonus="proficiencyBonus"
                />
                <SavingThrow
                  :saves="classData.saving_throws"
                  :stat="parseInt(character.stats.dex)"
                  name="dex"
                  :proficiencyBonus="proficiencyBonus"
                />
                <SavingThrow
                  :saves="classData.saving_throws"
                  :stat="parseInt(character.stats.con)"
                  name="con"
                  :proficiencyBonus="proficiencyBonus"
                />
              </div>
              <div class="w-1/2 p-2">
                <SavingThrow
                  :saves="classData.saving_throws"
                  :stat="parseInt(character.stats.int)"
                  name="int"
                  :proficiencyBonus="proficiencyBonus"
                />
                <SavingThrow
                  :saves="classData.saving_throws"
                  :stat="parseInt(character.stats.wis)"
                  name="wis"
                  :proficiencyBonus="proficiencyBonus"
                />
                <SavingThrow
                  :saves="classData.saving_throws"
                  :stat="parseInt(character.stats.cha)"
                  name="cha"
                  :proficiencyBonus="proficiencyBonus"
                />
              </div>
            </div>
          </div>
          <!-- skill throws -->
          <div
            class="mx-2 mt-4 mb-1 p-1 border-2 border-darkKhaki rounded-lg grow flex flex-col items-center shadow-lg"
          >
            <h3 class="font-bold text-lg text-maroon">Skills</h3>
            <div class="flex flex-col w-full p-2">
              <SkillSave
                v-for="skill in skills"
                :key="skill.index"
                :character-skills="character.skills"
                :skill="skill"
                :characterStats="character.stats"
                :proficiencyBonus="proficiencyBonus"
              />
            </div>
          </div>
        </div>

        <!-- second column -->
        <div class="w-6/12 laptopSm:w-7/12">
          <!-- proficiency-bonus & passive perception -->
          <div class="w-full flex flex-col laptopSm:flex-row">
            <div
              class="mx-2 my-1 h-16 border-2 border-darkKhaki rounded-lg laptopSm:w-1/2 flex justify-center items-center shadow-lg"
            >
              <ProficiencyBonus :proficiencyBonus="proficiencyBonus" />
            </div>
            <div
              class="mx-2 my-1 h-16 border-2 border-darkKhaki rounded-lg laptopSm:w-1/2 flex justify-center items-center shadow-lg"
            >
              <PassivePerception
                :wisdom="parseInt(character.stats.wis)"
                :proficiencyBonus="proficiencyBonus"
              />
            </div>
          </div>
          <!-- Hit points, AC & death saves -->
          <div v-if="classData" class="mx-2 my-3 rounded-lg flex flex-col bg-maroon/50 shadow-lg">
            <HitPoints
              :character="character"
              :hitDie="classData.hit_die"
              :dexterity="parseInt(character.stats.dex)"
              :speed="speed"
            >
            </HitPoints>
          </div>
          <!-- Traits -->
          <div
            v-if="traits.length > 0"
            class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg flex flex-col items-center shadow-lg p-2"
          >
            <h3 class="font-bold text-lg text-maroon">Traits</h3>
            <div>
              <CharTraits v-for="(trait, index) of traits" :key="index" :traitUrl="trait.url" />
            </div>
          </div>
        </div>
      </div>

      <!-- third column -->
      <div class="laptopSm:w-4/12 flex items-start laptopSm:items-stretch laptopSm:flex-col">
        <div
          v-if="weaponList.length > 0"
          class="mx-2 mb-3 border-2 border-darkKhaki rounded-lg w-1/2 laptopSm:w-auto"
        >
          <AttackOptions
            :equipment="character.equipment"
            :weaponList="weaponList"
            :proficiency="proficiencyBonus"
            :dexterity="parseInt(character.stats.dex)"
            :strength="parseInt(character.stats.str)"
          />
        </div>
        <div
          v-else
          class="mx-2 mb-3 border-2 border-darkKhaki rounded-lg h-96 flex justify-center items-center w-1/2 laptopSm:w-auto"
        >
          <p class="text-xl font-bold">Checking equipment...</p>
        </div>
        <div
          class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg flex justify-center w-1/2 laptopSm:w-auto"
        >
          <ClassProficiencies :proficiencies="proficiencies" :languages="character.languages" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails, savingThrows, classDetails } from '@/interfaces'
import { supabase } from '@/supabase'
import { BaseImage, BaseButton, BaseButtonBig } from '@/components/baseComponents'
import { computed, ref } from 'vue'
import { FaArrowUp } from 'vue3-icons/fa6'
import {
  AttackOptions,
  CharStat,
  CharTraits,
  ClassProficiencies,
  HitPoints,
  PassivePerception,
  ProficiencyBonus,
  SavingThrow,
  SkillSave
} from '@/components/characterPageComponents'
import axios from 'axios'

//  reactive variables to store the different kinds of data retrieved from the API
const src = ref('')
const classData = ref<classDetails>()
const skills = ref<savingThrows[]>([])
const traits = ref<savingThrows[]>([])
const proficiencies = ref<savingThrows[]>([])
const weaponList = ref<savingThrows[]>([])
const speed = ref(0)

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

// Fetch the necessary data for the character page and it's components
const setupFunction = async () => {
  // Download the image from the storage-bucket to show in the UI
  try {
    const { data, error } = await supabase.storage.from('avatars').download(props.character.avatar)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', (error as Error).message)
  }
  // Get the information belonging to the class of the character
  const fetchClass = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'classes/' + props.character.class
  )
  classData.value = fetchClass.data
  // Get the proficiencies of the class
  if (classData.value) {
    // Filter out the saving throws from the proficiencies
    const nonStatProficiencies = classData.value.proficiencies.filter(
      (a) => !a.index.includes('saving-throw')
    )
    nonStatProficiencies.forEach((p, index) => {
      // if the name contains a comma, it is in the format 'last, first' and needs to be reversed to be readable for the user
      if (p.name.includes(',')) {
        const splitProf = p.name.split(', ')
        const prof = `${splitProf[1]} ${splitProf[0]}`
        nonStatProficiencies[index].name = prof
      }
      proficiencies.value = nonStatProficiencies
    })
  }
  const fetchSkills = await axios.get(import.meta.env.VITE_5E_API_URL + 'skills')
  skills.value = fetchSkills.data.results
  const fetchRace = await axios.get(
    import.meta.env.VITE_5E_API_URL + `races/${props.character.race}`
  )
  traits.value = fetchRace.data.traits
  speed.value = fetchRace.data.speed
  // get list of weapons from the API
  const fetchMeleeWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/melee-weapons'
  )
  const fetchRangedWeapons = await axios.get(
    import.meta.env.VITE_5E_API_URL + 'equipment-categories/ranged-weapons'
  )
  weaponList.value = [...fetchMeleeWeapons.data.equipment, ...fetchRangedWeapons.data.equipment]
}
setupFunction()

// Calculate the proficiency bonus according to the dnd rules (necessary for multiple child components)
const proficiencyBonus = computed(() => {
  return Math.floor((props.character.level - 1) / 4) + 2
})
</script>
