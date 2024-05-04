<template>
  <form>
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
        <div>
          <p class="text-sm pb-1">Tool proficiency</p>
        </div>
        <div>
          <BaseLabel pl="small">Languages</BaseLabel>
          <div class="border-2 border-darkKhaki rounded-lg"></div>
        </div>
      </div>
    </div>
    <WizardNav />
  </form>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard-store'
import WizardNav from './WizardNav.vue'
import axios from 'axios'
import BaseLabel from './BaseLabel.vue'
import BaseSelect from './BaseSelect.vue'
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'

const store = useWizardStore()

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

// Get the information belonging to the class the user chose in the previous step
const chosenClass = await axios.get(
  import.meta.env.VITE_5E_API_URL + 'classes/' + store.characterInfo.charClass
)
// Retrieve the proficiencies the user gets to chose from due to the selected class and store them in an array
let classProficiencies: { index: string; name: string }[] = []
for (const prof of chosenClass.data.proficiency_choices[0].from.options) {
  const proficiency = prof.item.name
  const index = prof.index
  const parts: string[] = proficiency.split(' ')
  const proficiencyName = parts[1]
  console.log(index)
  classProficiencies.push({ index: index, name: proficiencyName })
}

// Define the form data object
const formData = reactive({
  selectedProficiency1: '',
  selectedProficiency2: ''
})

// Define the validation rules
const rules = computed(() => {
  return {
    selectedProficiency1: { required: helpers.withMessage('Field is required', required) },
    selectedProficiency2: { required: helpers.withMessage('Field is required', required) }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    store.nextStep({
      charClass: formData.selectedProficiency1,
      charBackground: formData.selectedProficiency2
    })
  }
}
</script>
