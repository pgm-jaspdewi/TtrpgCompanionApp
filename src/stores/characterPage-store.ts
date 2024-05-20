import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharPageStore = defineStore('charPageStore', () => {
  const step = ref(1)

  function setStep(newStep: number) {
    step.value = newStep
  }

  return {
    step,
    setStep
  }
})
