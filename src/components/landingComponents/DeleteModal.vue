<template>
  <div>
    <BaseH1 title="Delete Character?" :smaller-title="true" />
    <div class="flex flex-col justify-center items-center">
      <p class="text-lg">Are you sure you want to delete this character?</p>
      <p class="text-lg">Once deleted, there is no way to retrieve it.</p>
    </div>

    <div class="flex items-center justify-between mt-4">
      <BaseButton @click="closeModal" btnContent="Cancel" :secondary="true" :mirror="true">
        <FaXmark class="fill-paleGold w-4 h-4" />
      </BaseButton>
      <BaseButton @click="deleteCharacter" btnContent="Delete">
        <FaTrash class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseH1, BaseButton } from '@/components/baseComponents'
import { FaTrash, FaXmark } from 'vue3-icons/fa6'
import { useModalStore } from '@/stores/modal-store'
import { supabase } from '@/supabase'

const store = useModalStore()

const closeModal = () => {
  store.toggleDeleteModal()
}

const deleteCharacter = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
  } else {
    const id = data.user.id
    // get the characters from the database
    const { error: charactersError } = await supabase
      .from('characters')
      .delete()
      .eq('userId', id)
      .eq('id', store.characterIdToDelete)
    if (charactersError) {
      console.error('Error deleting characters:', charactersError.message)
    } else {
      store.characterIdToDelete = 0
      store.characterListWasAltered = true
      store.toggleDeleteModal()
    }
  }
}
</script>
