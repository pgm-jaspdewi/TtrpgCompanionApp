import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useWizardStore = defineStore('wizard-store', () => {
  const step = ref(1)
  const characterInfo = reactive({
    charAvatar: '',
    charName: '',
    charRace: '',
    charStats: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0
    },
    charClass: '',
    charBackground: ''
  })

  function nextStep(formdData: object) {
    const store = useWizardStore()
    store.$patch({
      characterInfo: {
        ...formdData
      }
    })
    step.value++
  }

  function prevStep() {
    step.value--
  }

  return { step, characterInfo, nextStep, prevStep }
})
