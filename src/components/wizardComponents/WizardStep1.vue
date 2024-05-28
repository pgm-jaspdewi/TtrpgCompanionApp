<template>
  <form @submit.prevent="handleSubmit" class="h-form flex flex-col justify-between">
    <div class="flex my-6 mt-8">
      <div class="w-5/12 flex justify-center">
        <div>
          <BaseAvatar v-model:path="v$.charAvatar.$model" />
          <span
            class="text-redishBrown pl-2 w-7/12"
            v-for="error in v$.charAvatar.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>
      <div class="w-7/12 pr-10">
        <div class="mb-2">
          <BaseInput v-model="v$.charName.$model" label="Character Name" id="charName" />
          <span
            class="text-redishBrown pl-2"
            v-for="error in v$.charName.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>
        <div class="mb-6">
          <BaseSelect
            label="Character Race"
            v-model="v$.charRace.$model"
            :options="races.data.results"
          />
          <span
            class="text-redishBrown pl-2"
            v-for="error in v$.charRace.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>
    </div>
    <WizardNav navType="first" />
  </form>
</template>

<script async setup lang="ts">
import { BaseAvatar, BaseInput, BaseSelect } from '@/components/baseComponents'
import WizardNav from './WizardNav.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import axios from 'axios'
import { useWizardStore } from '@/stores/wizard-store'

const store = useWizardStore()

const races = await axios.get(import.meta.env.VITE_5E_API_URL + 'races')

// Define the form data object
const formData = reactive({
  charAvatar: store.characterInfo.charAvatar,
  charName: store.characterInfo.charName,
  charRace: store.characterInfo.charRace
})

// Define the validation rules
const rules = computed(() => {
  return {
    charAvatar: { required: helpers.withMessage('Field is required', required) },
    charName: { required: helpers.withMessage('Field is required', required) },
    charRace: { required: helpers.withMessage('Field is required', required) }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    store.nextStep({
      charAvatar: formData.charAvatar,
      charName: formData.charName,
      charRace: formData.charRace
    })
  }
}
</script>
