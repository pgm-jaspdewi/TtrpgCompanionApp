<template>
  <button
    @click="handleClick"
    :class="{
      'bg-paleGold border-t-2 border-x-2 cursor-default': store.step === step,
      'bg-paleGoldGrayed border-2 hover:bg-maroon hover:text-paleGold': store.step != step
    }"
    class="border-maroon h-8 px-4 py-1 mx-1 rounded-t-md text-maroon font-bold"
    :disabled="store.step === step"
  >
    {{ btnContent }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  btnContent: {
    type: String,
    required: true
  },
  step: {
    type: Number,
    required: true
  }
})

import { useCharPageStore } from '@/stores/characterPage-store'
import { toRefs } from 'vue'
const store = useCharPageStore()

const { step } = toRefs(props)

const handleClick = () => {
  store.setStep(step.value)
}
</script>
