<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-between py-6">
      <div class="w-5/12 pl-4">
        <BaseLabel pl="small">Skill proficiencies</BaseLabel>
        <div class="border-2 border-darkKhaki rounded-lg">
          <BaseLabel pl="small" class="pt-1 text-maroon text-xs">Background skills:</BaseLabel>
          <div
            v-for="(prof, index) in backgroundProficiencies"
            :key="'backgroundProf' + index"
            class="opacity-50 border-2 border-maroon text-maroon rounded-lg p-1 pl-4 m-2"
          >
            <p class="text-sm">{{ prof }}</p>
          </div>

          <BaseLabel pl="small" class="pt-1 text-maroon text-xs">Available class skills:</BaseLabel>
          <BaseSelect
            v-model="v$.selectedProficiency1.$model"
            :options="classProficiencies"
            :smallFormMode="true"
          />
          <BaseSelect
            v-model="v$.selectedProficiency2.$model"
            :options="classProficiencies"
            :smallFormMode="true"
          />
        </div>
      </div>
      <div class="w-5/12 pr-4">
        <!-- 
          Tool proficiency is only available with one or two classes and has no direct impact on gameplay, 
          therefore it can be ignored for now. 
          To be added after core functionality of the app is guaranteed.
        -->
        <!-- 
        <div>
          <p class="text-sm pb-1">Tool proficiency</p>
        </div> 
        -->
        <div>
          <BaseLabel pl="small">Languages</BaseLabel>
          <div class="border-2 border-darkKhaki rounded-lg">
            <BaseLabel pl="small" class="pt-1 text-maroon text-xs">Racial Languages:</BaseLabel>
            <div
              v-for="(lang, index) in raceLanguages"
              :key="'backgroundProf' + index"
              class="opacity-50 border-2 border-maroon text-maroon rounded-lg p-1 pl-4 m-2"
            >
              <p class="text-sm">{{ lang }}</p>
            </div>

            <BaseLabel pl="small" class="pt-1 text-maroon text-xs">
              Other available languages:
            </BaseLabel>
            <BaseSelect
              v-model="v$.selectedLanguage1.$model"
              :options="languages"
              :smallFormMode="true"
            />
            <BaseSelect
              v-model="v$.selectedLanguage2.$model"
              :options="languages"
              :smallFormMode="true"
            />
          </div>
        </div>
      </div>
    </div>
    <WizardNav />
  </form>
</template>

<script setup lang="ts">
import { BaseLabel, BaseSelect } from '@/components/baseComponents'
import { useWizardStore } from '@/stores/wizard-store'
import WizardNav from './WizardNav.vue'
import axios from 'axios'
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

const store = useWizardStore()

/**  Character background functionality*/
// Get the information belonging to the background the user chose in the previous step
const chosenBackground = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'backgrounds/' + store.characterInfo.charBackground
)
// Retrieve the proficiencies the user gets from the chosen background and store them in an array
let backgroundProficiencies: string[] = []
for (const prof of chosenBackground.data.starting_proficiencies) {
  const proficiency = prof.name
  const parts: string[] = proficiency.split(' ')
  const proficiencyName = parts[1]
  backgroundProficiencies.push(proficiencyName)
}

/**  Character class functionality */
// Get the information belonging to the class the user chose in the previous step
const chosenClass = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'classes/' + store.characterInfo.charClass
)
// Retrieve the proficiencies the user gets to chose from due to the selected class and store them in an array
let classProficiencies: { index: string; name: string }[] = []
for (const prof of chosenClass.data.proficiency_choices[0].from.options) {
  const proficiency = prof.item.name
  const parts: string[] = proficiency.split(' ')
  const proficiencyName = parts[1]
  classProficiencies.push({ index: proficiencyName, name: proficiencyName })
}

/**  Character race functionality*/
// Get the information belonging to the race the user chose in the first step
const chosenRace = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'races/' + store.characterInfo.charRace
)
// Retrieve the languages the user gets from the race background and store them in an array
let raceLanguages: string[] = []
for (const lang of chosenRace.data.languages) {
  raceLanguages.push(lang.name)
}

/** Languages functionality */
// Get the information belonging to the languages available in the game
const languagesResult = await axios.get(import.meta.env.VITE_5E_API_URL + 'languages')

// Retrieve the languages available in the game and store them in an array
let languages: { index: string; name: string }[] = []
for (const lang of languagesResult.data.results) {
  languages.push({ index: lang.name, name: lang.name })
}

/** Form functionality */
// Define the form data object
const formData = reactive({
  // The array that is passed to the store before the inputs from the form can vary in length.
  // However, the last two elements are always the ones that were selected by the user in this step.
  // So to display the correct values in the inputs when the user returns to this step, the last two elements are selected.
  selectedProficiency1:
    store.characterInfo.skillProficiencies[store.characterInfo.skillProficiencies.length - 2],
  selectedProficiency2:
    store.characterInfo.skillProficiencies[store.characterInfo.skillProficiencies.length - 1],
  selectedLanguage1:
    store.characterInfo.languageProficiencies[store.characterInfo.languageProficiencies.length - 2],
  selectedLanguage2:
    store.characterInfo.languageProficiencies[store.characterInfo.languageProficiencies.length - 1]
})

// Define the validation rules
const rules = computed(() => {
  return {
    selectedProficiency1: { required: helpers.withMessage('Field is required', required) },
    selectedProficiency2: { required: helpers.withMessage('Field is required', required) },
    selectedLanguage1: { required: helpers.withMessage('Field is required', required) },
    selectedLanguage2: { required: helpers.withMessage('Field is required', required) }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    // Add the characters proficiencies to the store
    store.nextStep({
      skillProficiencies: [
        ...backgroundProficiencies,
        formData.selectedProficiency1,
        formData.selectedProficiency2
      ],
      languageProficiencies: [
        ...raceLanguages,
        formData.selectedLanguage1,
        formData.selectedLanguage2
      ]
    })
  }
}
</script>
