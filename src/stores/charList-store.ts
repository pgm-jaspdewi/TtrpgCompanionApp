import { defineStore } from 'pinia'
import { ref } from 'vue'

// Store that keeps track of changes pertaining to the character list
export const useCharListStore = defineStore('charList-store', () => {
  // Create a reactive reference for the character ID to delete
  const characterIdToDelete = ref<number>(0)
  // Create a reactive reference for the character avatar to delete
  const characterAvatarToDelete = ref<string>('')
  // Create a reactive reference to see if a character was deleted/added to the list
  const characterListWasAltered = ref(false)

  return {
    characterIdToDelete,
    characterAvatarToDelete,
    characterListWasAltered
  }
})
