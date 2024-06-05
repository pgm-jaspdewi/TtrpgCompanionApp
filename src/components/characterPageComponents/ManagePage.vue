<template>
  <div>
    <div class="m-2 mb-6 pb-4 border-b-2 border-silverChalice">
      <h2 class="text-2xl text-maroon font-bold">Edit character</h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col justify-between max-w-editForm">
        <div class="flex flex-col tablet:flex-row my-6 mt-8">
          <div class="w-full tablet:w-5/12 flex justify-center">
            <div>
              <BaseAvatar v-model:path="characterAvatar" :editForm="true"/>
              
            </div>
          </div>
          <div class="w-full tablet:w-7/12 pt-10 tablet:pt-0 tablet:pr-10">
            <div class="mb-2">
              <BaseInput v-model="characterName" label="Character Name" id="charName" />
            </div>
            <div class="mb-6">
              <BaseSelect
                label="Character Race"
                v-model="characterRace"
                :options="allRaces"
              />

            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <BaseButton
          v-if="changesMade"
          @click="handleSubmit"
          btnContent="Update Character"
          class="bg-maroon hover:bg-lightKhaki text-lightKhaki hover:text-maroon"
          >
            <FaFilePen class="fill-maroon group-hover:fill-lightKhaki w-4 h-4"/>
          </BaseButton>
        </div>
        
      </form>
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
import {BaseButton, BaseInput, BaseAvatar, BaseSelect} from '@/components/baseComponents';
import { FaTrash, FaFilePen } from 'vue3-icons/fa6'
import { useCharListStore } from '@/stores/charList-store'
import { useModalStore } from '@/stores/modal-store'
import { ref, watch } from 'vue';
import axios from 'axios';
import { useCharPageStore } from '@/stores/characterPage-store';
import { supabase } from '@/supabase';

const modal = useModalStore()
const store = useCharListStore()
const pagesStore = useCharPageStore()

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})
const characterAvatar = ref(props.character.avatar)
const characterName = ref(props.character.name)
const characterRace = ref(props.character.race)
const allRaces = ref([])
const changesMade = ref(false)

const setup = async () => {
  const fetchRaces = await axios.get(import.meta.env.VITE_5E_API_URL + 'races')
  allRaces.value = fetchRaces.data.results
}
setup()

//  watch for changes in the form
watch([characterName, characterRace, characterAvatar], () => {
  changesMade.value = true
  pagesStore.setUnsavedChanges()
  pagesStore.setAvatars(props.character.avatar, characterAvatar.value)
})

// Delete the character from the database
const deleteCharacter = () => {
  store.characterIdToDelete = props.character.id
  store.characterAvatarToDelete = props.character.avatar
  modal.toggleDeleteModal()
}

// Update the character in the database
const updateCharacter = async () => {
  const { error } = await supabase
    .from('characters')
    .update({ 
      name: characterName.value,
      race: characterRace.value,
      avatar: characterAvatar.value
      })
    .eq('id', props.character.id)
    .single()
  if (error) {
    console.error('Error:', error)
  }
}

// Remove the old avatar from the storage
const removeOldAvatar = async () => {
  const oldAvatar = props.character.avatar
  const { error } = await supabase.storage.from('avatars').remove([oldAvatar])
  if (error) {
    console.error('Error:', error)
  }
}


const handleSubmit = () => {
  removeOldAvatar()
  updateCharacter()
  changesMade.value = false
  pagesStore.setUnsavedChanges()
  pagesStore.setRefreshNecessary()
}
</script>