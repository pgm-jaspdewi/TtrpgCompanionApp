import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define a new store for toggling modals
export const useModalStore = defineStore('modal-store', () => {
  // Create a reactive object for the stat modal
  const statModal = ref(false)
  // create a reactive object for the delete modal
  const deleteModal = ref(false)

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
    toggleStatModal,
    toggleDeleteModal
  }
})
