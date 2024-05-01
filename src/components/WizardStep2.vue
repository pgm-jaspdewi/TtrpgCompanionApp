<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex align-middle justify-center items-center mt-4">
      <div>
        <p class="text-sm pb-1">Fill in stats</p>
        <div class="flex space-x-1">
          <BaseInputSmall label="str" v-model="v$.charStats.str.$model" id="str" />
          <BaseInputSmall label="dex" v-model="v$.charStats.dex.$model" id="dex" />
          <BaseInputSmall label="con" v-model="v$.charStats.con.$model" id="con" />
          <BaseInputSmall label="int" v-model="v$.charStats.int.$model" id="int" />
          <BaseInputSmall label="wis" v-model="v$.charStats.wis.$model" id="wis" />
          <BaseInputSmall label="cha" v-model="v$.charStats.cha.$model" id="cha" />
        </div>
        <!-- Custom error for all stats together -->
        <span class="text-redishBrown pl-2 w-7/12" v-if="v$.charStats.$errors.length > 0">
          A value is required for every stat
        </span>
      </div>
      <p class="mx-4 laptopSm:mx-6 laptopLg:mx-8">OR</p>
      <div>
        <BaseButton type="button" btnContent="Roll stats" @click="modalStore.toggleStatModal()">
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
      <div class="mb-4 w-7/12">
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
  </form>
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
import { useStatModalStore } from '@/stores/modal-stores'
import { FaDice } from 'vue3-icons/fa6'
import BaseInputSmall from './BaseInputSmall.vue'

const wizardStore = useWizardStore()
const modalStore = useStatModalStore()

const classes = await axios.get(import.meta.env.VITE_5E_API_URL + 'classes')
const backgrounds = await axios.get(import.meta.env.VITE_5E_API_URL + 'backgrounds')

// Define the form data object
const formData = reactive({
  charStats: computed(() => {
    return {
      str: wizardStore.charStats.str,
      dex: wizardStore.charStats.dex,
      con: wizardStore.charStats.con,
      int: wizardStore.charStats.int,
      wis: wizardStore.charStats.wis,
      cha: wizardStore.charStats.cha
    }
  }),
  charClass: wizardStore.characterInfo.charClass,
  charBackground: wizardStore.characterInfo.charBackground
})

// Define the validation rules
const rules = computed(() => {
  return {
    charStats: {
      str: { required },
      dex: { required },
      con: { required },
      int: { required },
      wis: { required },
      cha: { required }
    },
    charClass: { required: helpers.withMessage('Field is required', required) },
    charBackground: { required: helpers.withMessage('Field is required', required) }
  }
})

// Create the vuelidate instance
const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const result = await v$.value.$validate()
  if (result) {
    wizardStore.nextStep({
      charStats: {
        str: formData.charStats.str,
        dex: formData.charStats.dex,
        con: formData.charStats.con,
        int: formData.charStats.int,
        wis: formData.charStats.wis,
        cha: formData.charStats.cha
      },
      charClass: formData.charClass,
      charBackground: formData.charBackground
    })
  }
}
</script>
