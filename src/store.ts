import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWizardStore = defineStore('wizard-store', () => {
  const step = ref(1)
  function nextStep() {
    step.value++
  }

  function prevStep() {
    step.value--
  }

  return { step, nextStep, prevStep }
})
