import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharPageStore = defineStore('charPageStore', () => {
  const step = ref(1)

  // This is a flag to check if any changes were made to the character on the manage page and wether they were saved or not
  const unsavedChanges = ref(false)
  //
  const oldAvatar = ref('')
  const newAvatar = ref('')

  function setStep(newStep: number) {
    step.value = newStep
  }

  function setUnsavedChanges() {
    unsavedChanges.value = !unsavedChanges.value
  }

  function setAvatars(oldAvatarValue: string, newAvatarValue: string) {
    oldAvatar.value = oldAvatarValue
    newAvatar.value = newAvatarValue
    if (oldAvatar.value === newAvatar.value) {
      setUnsavedChanges()
      oldAvatar.value = ''
      newAvatar.value = ''
    }
  }

  return {
    step,
    unsavedChanges,
    oldAvatar,
    newAvatar,
    setStep,
    setUnsavedChanges,
    setAvatars
  }
})
