<template>
  <!-- returned when navType = "first" -->
  <div v-if="navType === 'first'" class="flex justify-center">
    <BaseButton btnContent="Next" type="submit">
      <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
    </BaseButton>
  </div>

  <!-- returned when navType = "default" -->
  <div v-if="navType === 'default'" class="flex justify-around">
    <BaseButton btnContent="Back" @click="store.prevStep" :mirror="true">
      <FaAngleLeft class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
    </BaseButton>
    <BaseButton v-if="formButton" btnContent="Next" type="submit">
      <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
    </BaseButton>
    <BaseButton v-if="!formButton" btnContent="Next" @click="store.nextStep">
      <FaAngleRight class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
    </BaseButton>
  </div>

  <!-- returned when navType = "last" -->
  <div v-if="navType === 'last'" class="flex justify-around">
    <BaseButton btnContent="Back" @click="store.prevStep" :mirror="true">
      <FaAngleLeft class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
    </BaseButton>
    <BaseButton btnContent="Finish" @click="store.nextStep">
      <FaUserPlus class="fill-maroon group-hover:fill-lightKaki w-4 h-4" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { FaAngleRight, FaAngleLeft, FaUserPlus } from 'vue3-icons/fa6'

import { useWizardStore } from '@/stores/wizard-store'
import BaseButton from './BaseButton.vue'

const store = useWizardStore()

defineProps({
  navType: {
    type: String,
    // The value of navType must be one of the specified strings
    validator(value: string) {
      return ['default', 'first', 'last'].includes(value)
    },
    required: false,
    default: 'default'
  },
  formButton: {
    type: Boolean,
    default: true,
    required: false
  }
})
</script>
