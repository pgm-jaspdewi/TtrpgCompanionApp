<template>
  <form class="flex my-10">
    <div class="w-5/12"></div>
    <div class="w-7/12 pr-10">
      <div class="mb-2">
        <BaseInput v-model="v$.charName.$model" label="Character Name" id="charName" />
        <span class="text-redishBrown pl-2" v-for="error in v$.charName.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>
      <div class="mb-6">
        <BaseSelect label="Character" v-model="v$.charRace.$model" :options="races.data.results" />
        <span class="text-redishBrown pl-2" v-for="error in v$.charRace.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </form>

  <WizardNav navType="first" />
</template>

<script async setup lang="ts">
import WizardNav from './WizardNav.vue'
import BaseInput from './BaseInput.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import axios from 'axios'
import BaseSelect from './BaseSelect.vue'

const url = import.meta.env.VITE_5E_API_URL + 'races'

const races = await axios.get(url)

console.log(races.data.results)

// Define the form data object
const formData = reactive({
  charName: '',
  charRace: ''
})

// Define the validation rules
const rules = computed(() => {
  return {
    charName: { required: helpers.withMessage('An adventurer needs a name.', required) },
    charRace: {}
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)
</script>
