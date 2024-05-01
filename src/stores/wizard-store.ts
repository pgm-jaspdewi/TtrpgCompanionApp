import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useStatModalStore } from './modal-stores'

export const useWizardStore = defineStore('wizard-store', () => {
  const step = ref(1)
  const charStats = reactive({
    str: '0',
    dex: '0',
    con: '0',
    int: '0',
    wis: '0',
    cha: '0'
  })
  const characterInfo = reactive({
    charAvatar: '',
    charName: '',
    charRace: '',
    charStats: charStats,
    charClass: '',
    charBackground: ''
  })

  function nextStep(formData: object) {
    const store = useWizardStore()
    store.$patch({
      characterInfo: {
        ...formData
      }
    })
    step.value++
  }

  function prevStep() {
    step.value--
  }

  function closeModal(formData: object) {
    const store = useWizardStore()
    const modalStore = useStatModalStore()
    store.$patch({
      charStats: {
        ...formData
      }
    })
    modalStore.toggleStatModal()
  }

  return {
    step,
    charStats,
    characterInfo,
    nextStep,
    prevStep,
    closeModal
  }
})
