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
import { useCharListStore } from '@/stores/charList-store'
import { useRouter } from 'vue-router'

const modal = useModalStore()
const store = useCharListStore()
const router = useRouter()

const closeModal = () => {
  store.characterIdToDelete = 0
  store.characterAvatarToDelete = ''
  modal.toggleDeleteModal()
}

// delete the character from the database and it's image from the storage bucket
const deleteCharacter = async () => {
  // get the user's profile
  const { data, error } = await supabase.auth.getUser()
  // if there is an error, log it to the console
  if (error) {
    console.error('Error getting user:', error.message)
  } else {
    // save the user's id to a variable
    const id = data.user.id
    // remove the character from the database
    const { error: charactersError } = await supabase
      .from('characters')
      .delete()
      // filter the character to delete by the user's id and the character's id
      .eq('userId', id)
      .eq('id', store.characterIdToDelete)
    // if there is an error, log it to the console
    if (charactersError) {
      console.error('Error deleting characters:', charactersError.message)
    } else {
      // remove the character's avatar from the storage bucket
      const { error: storageError } = await supabase.storage
        .from('avatars')
        .remove([store.characterAvatarToDelete])
      // if there is an error, log it to the console
      if (storageError) {
        console.error('Error deleting avatar:', storageError.message)
      } else {
        // reset the characterIdToDelete and characterAvatarToDelete
        store.characterIdToDelete = 0
        store.characterAvatarToDelete = ''
        // alert the store that the character list has been altered
        store.characterListWasAltered = true
        // close the modal
        modal.toggleDeleteModal()
        // navigate back to the character list
        router.push('/')
      }
    }
  }
}
</script>
