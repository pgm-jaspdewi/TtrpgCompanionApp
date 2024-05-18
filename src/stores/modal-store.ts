import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define a new store for toggling a modal
export const useModalStore = defineStore('modal-store', () => {
  // Create a reactive object for the stat modal
  const statModal = ref(false)
  // create a reactive object for the delete modal
  const deleteModal = ref(false)
  // Create a reactive reference for the character ID to delete
  const characterIdToDelete = ref<number>()
  // Create a reactive reference to see if a character was deleted
  const characterListWasAltered = ref(false)

  // Toggle the stat modal
  function toggleStatModal() {
    statModal.value = !statModal.value
  }
  // Toggle the delete modal
  function toggleDeleteModal() {
    deleteModal.value = !deleteModal.value
  }

  return {
    statModal,
    deleteModal,
    characterIdToDelete,
    characterListWasAltered,
    toggleStatModal,
    toggleDeleteModal
  }
})
