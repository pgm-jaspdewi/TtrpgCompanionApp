<template>
  <div class="flex align-middle justify-center items-center mt-4">
    <div>
      <p class="text-sm pb-1">Fill in stats</p>
      <div class="flex space-x-1">
        <BaseInputSmall label="str" v-model="v$.str.$model" id="str" />
        <BaseInputSmall label="dex" v-model="v$.dex.$model" id="dex" />
        <BaseInputSmall label="con" v-model="v$.con.$model" id="con" />
        <BaseInputSmall label="int" v-model="v$.int.$model" id="int" />
        <BaseInputSmall label="wis" v-model="v$.wis.$model" id="wis" />
        <BaseInputSmall label="cha" v-model="v$.cha.$model" id="cha" />
      </div>
    </div>
    <p class="mx-4 laptopSm:mx-6 laptopLg:mx-8">OR</p>
    <div>
      <BaseButton btnContent="Roll stats">
        <FaDice class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
      </BaseButton>
    </div>
  </div>
  <div class="flex flex-col items-center mt-4">
    <div class="mb-2 w-7/12">
      <BaseSelect
        label="Character Class"
        v-model="v$.charClass.$model"
        :options="classes.data.results"
      />
      <span class="text-redishBrown pl-2" v-for="error in v$.charClass.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>
    </div>
    <div class="mb-6 w-7/12">
      <BaseSelect
        label="Character Background"
        v-model="v$.charBackground.$model"
        :options="backgrounds.data.results"
      />
      <span
        class="text-redishBrown pl-2"
        v-for="error in v$.charBackground.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </div>
  </div>

  <WizardNav />
</template>

<script setup lang="ts">
import WizardNav from './WizardNav.vue'
import BaseButton from '@/components/BaseButton.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import axios from 'axios'
import BaseSelect from './BaseSelect.vue'
import { useWizardStore } from '@/stores/wizard-store'
import { FaDice } from 'vue3-icons/fa6'
import BaseInputSmall from './BaseInputSmall.vue'

const store = useWizardStore()

const classes = await axios.get(import.meta.env.VITE_5E_API_URL + 'classes')
const backgrounds = await axios.get(import.meta.env.VITE_5E_API_URL + 'backgrounds')

// Define the form data object
const formData = reactive({
  str: '',
  dex: '',
  con: '',
  int: '',
  wis: '',
  cha: '',
  charClass: '',
  charBackground: ''
})

// Define the validation rules
const rules = computed(() => {
  return {
    str: { required },
    dex: { required },
    con: { required },
    int: { required },
    wis: { required },
    cha: { required },
    charClass: { required: helpers.withMessage('Field is required', required) },
    charBackground: { required: helpers.withMessage('Field is required', required) }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    store.nextStep({
      charClass: formData.charClass,
      charBackground: formData.charBackground
    })
  }
}
</script>
