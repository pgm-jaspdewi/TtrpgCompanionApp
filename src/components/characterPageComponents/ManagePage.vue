<template>
  <div>
    <div class="m-2 mb-6 pb-4 border-b-2 border-silverChalice">
      <h2 class="text-2xl text-maroon font-bold">Edit character</h2>
      <p>Change character name</p>
      <p>Change character race</p>
      <p>Change avatar</p>
    </div>

    <div class="m-2 mb-4 pb-4 border-b-2 border-silverChalice">
      <h2 class="text-2xl text-maroon font-bold pb-2">Delete character</h2>
      <BaseButton @click="deleteCharacter" btnContent="Delete Character">
        <FaTrash class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
      </BaseButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces';
import {BaseButton} from '@/components/baseComponents';
import { FaTrash } from 'vue3-icons/fa6'
import { useCharListStore } from '@/stores/charList-store'
import { useModalStore } from '@/stores/modal-store'

const modal = useModalStore()
const store = useCharListStore()

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

const deleteCharacter = () => {
  store.characterIdToDelete = props.character.id
  store.characterAvatarToDelete = props.character.avatar
  modal.toggleDeleteModal()
}
</script>