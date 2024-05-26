import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useCharPageStore = defineStore('charPageStore', () => {
  const step = ref(1)

  const statModifiers = reactive([] as object[])

  function setModifiers(formData: object[]) {
    const store = useCharPageStore()
    store.$patch({
      statModifiers: [...formData]
    })
  }

  function setStep(newStep: number) {
    step.value = newStep
  }

  return {
    step,
    statModifiers,
    setModifiers,
    setStep
  }
})
