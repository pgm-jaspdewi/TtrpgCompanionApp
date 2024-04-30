import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// Define a new store for toggling the stat modal
export const useStatModalStore = defineStore('statModal-store', () => {
  // Create a ref for the stat modal
  const statModal = ref(false)

  // Toggle the stat modal
  function toggleStatModal() {
    statModal.value = !statModal.value
  }

  return { statModal, toggleStatModal }
})
