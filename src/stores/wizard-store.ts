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
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
  })

  const characterInfo = reactive({
    charAvatar: '',
    charName: '',
    charRace: '',
    charStats: charStats,
    charClass: '',
    charBackground: '',
    skillProficiencies: [] as string[],
    backgroundSkills: [] as string[],
    // toolProficiency: '',
    racialLanguages: [] as string[],
    languageProficiencies: [] as string[],
    backgroundLanguages: [] as string[],
    selectedCantrips: [] as string[],
    selected1stLvlSpells: [] as string[],
    selectedSpells: [] as { name: string; level: number }[],
    selectedEquipment: [] as equipment[],
    standardEquipment: [] as equipment[],
    hitpoints: 0
  })

  function setImage(avatar: string) {
    characterInfo.charAvatar = avatar
  }

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

  function resetStore() {
    const store = useWizardStore()
    store.$patch({
      step: 1,
      charStats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      },
      characterInfo: {
        charAvatar: '',
        charName: '',
        charRace: '',
        charClass: '',
        charBackground: '',
        skillProficiencies: [] as string[],
        backgroundSkills: [] as string[],
        racialLanguages: [] as string[],
        languageProficiencies: [] as string[],
        backgroundLanguages: [] as string[],
        selectedCantrips: [] as string[],
        selected1stLvlSpells: [] as string[],
        selectedSpells: [] as { name: string; level: number }[],
        selectedEquipment: [] as equipment[],
        standardEquipment: [] as equipment[],
        hitpoints: 0
      }
    })
  }

  async function submitCharacter(items: equipment[], weapons: equipment[]) {
    // submit character to backend
    const store = useCharListStore()
    const thisStore = useWizardStore()

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
          languages: [...characterInfo.racialLanguages, ...characterInfo.languageProficiencies],
          // cantrips: characterInfo.selectedCantrips,
          // first_level_spells: characterInfo.selected1stLvlSpells,
          spells: characterInfo.selectedSpells,
          equipment: items,
          weapons: weapons,
          level: 1,
          maxHitPoints: characterInfo.hitpoints,
          currentHitPoints: characterInfo.hitpoints,
          wealth: [
            { type: 'pp', amount: 0 },
            { type: 'gp', amount: 0 },
            { type: 'sp', amount: 0 },
            { type: 'cp', amount: 0 }
          ]
        })
        .select()

      // let the store know that the character list was altered
      store.characterListWasAltered = true
      thisStore.resetStore()
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
    setImage,
    nextStep,
    prevStep,
    closeModal,
    resetStore,
    submitCharacter
  }
})
