import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useModalStore } from './modal-store'
import { supabase } from '../supabase'
import type { equipment } from '../interfaces'
import { useRouter } from 'vue-router'
import { useCharListStore } from './charList-store'

// Define a new store for the wizard
export const useWizardStore = defineStore('wizard-store', () => {
  const router = useRouter()
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
    charBackground: '',
    skillProficiencies: [''],
    // toolProficiency: '',
    languageProficiencies: [''],
    selectedCantrips: [''],
    selected1stLvlSpells: [''],
    selectedEquipment: [] as equipment[]
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
    const modal = useModalStore()
    store.$patch({
      charStats: {
        ...formData
      }
    })
    modal.toggleStatModal()
  }

  async function submitCharacter() {
    // submit character to backend
    const store = useCharListStore()
    try {
      await supabase
        .from('characters')
        .insert({
          avatar: characterInfo.charAvatar,
          name: characterInfo.charName,
          race: characterInfo.charRace,
          stats: {
            str: characterInfo.charStats.str,
            dex: characterInfo.charStats.dex,
            con: characterInfo.charStats.con,
            int: characterInfo.charStats.int,
            wis: characterInfo.charStats.wis,
            cha: characterInfo.charStats.cha
          },
          class: characterInfo.charClass,
          background: characterInfo.charBackground,
          skills: characterInfo.skillProficiencies,
          languages: characterInfo.languageProficiencies,
          cantrips: characterInfo.selectedCantrips,
          first_level_spells: characterInfo.selected1stLvlSpells,
          equipment: characterInfo.selectedEquipment,
          level: 1
        })
        .select()

      // let the store know that the character list was altered
      store.characterListWasAltered = true
      // redirect to landing page
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return {
    step,
    charStats,
    characterInfo,
    nextStep,
    prevStep,
    closeModal,
    submitCharacter
  }
})
