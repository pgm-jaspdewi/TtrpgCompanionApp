<template>
  <form @submit.prevent="handleSubmit" class="tablet:h-form flex flex-col justify-between">
    <div class="flex flex-col tablet:flex-row justify-between pb-6 mt-8">
      <div class="tablet:w-5/12 tablet:pl-4">
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
            v-for="(prof, index) in classProficiencyChoices"
            :key="'proficiency' + index"
            v-model="selectedProficiencies[index]"
            :options="classProficiencies"
            :smallFormMode="true"
          />
          <!-- <BaseSelect
            v-model="v$.selectedProficiency1.$model"
            :options="classProficiencies"
            :smallFormMode="true"
          />
          <BaseSelect
            v-model="v$.selectedProficiency2.$model"
            :options="classProficiencies"
            :smallFormMode="true"
          /> -->
        </div>
      </div>
      <div class="mt-4 tablet:mt-0 tablet:w-5/12 tablet:pr-4">
        <!-- 
          Tool proficiency is only available with one or two classes and has no direct impact on gameplay, 
          therefore it can be ignored for now. 
          To be added after core functionality of the app is guaranteed.
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
              v-for="(lang, index) in backgroundLanguages"
              :key="'language' + index"
              v-model="selectedLanguages[index]"
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
import { computed, reactive, ref } from 'vue'
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

let backgroundLanguages: number = chosenBackground.data.language_options.choose

/**  Character class functionality */
// Get the information belonging to the class the user chose in the previous step
const chosenClass = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'classes/' + store.characterInfo.charClass
)
// Retrieve the proficiencies the user gets to chose from due to the selected class and store them in an array
let classProficiencies: { index: string; name: string }[] = []
let classProficiencyChoices = chosenClass.data.proficiency_choices[0].choose
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
  selectedProficiencies: store.characterInfo.skillProficiencies,
  selectedLanguages: store.characterInfo.languageProficiencies
})

// Define the validation rules
const rules = computed(() => {
  return {
    selectedProficiencies: {
      $each: { required: helpers.withMessage('Field is required', required) }
    },
    selectedLanguages: {
      $each: { required: helpers.withMessage('Field is required', required) }
    }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

// Create the reactive variables
const selectedLanguages = ref(v$.value.selectedLanguages.$model)
const selectedProficiencies = ref(v$.value.selectedProficiencies.$model)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    // Add the characters proficiencies to the store
    store.nextStep({
      skillProficiencies: formData.selectedProficiencies,
      backgroundSkills: backgroundProficiencies,
      racialLanguages: raceLanguages,
      languageProficiencies: formData.selectedLanguages,
      backgroundlanguages: raceLanguages,
      hitpoints: chosenClass.data.hit_die
    })
  }
}
</script>
