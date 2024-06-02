<template>
  <div>
    <div class="m-2 mb-6 pb-4 border-b-2 border-silverChalice">
      <h2 class="text-2xl text-maroon font-bold">Edit character</h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col justify-between max-w-editForm">
        <div class="flex my-6 mt-8">
          <div class="w-5/12 flex justify-center">
            <div>
              <BaseAvatar v-model:path="characterAvatar" :editForm="true"/>
              
            </div>
          </div>
          <div class="w-7/12 pr-10">
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
import { FaTrash } from 'vue3-icons/fa6'
import { useCharListStore } from '@/stores/charList-store'
import { useModalStore } from '@/stores/modal-store'
import { ref, watch } from 'vue';
import axios from 'axios';

const modal = useModalStore()
const store = useCharListStore()

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
const showUpdateButton = ref(false)

const setup = async () => {
  const fetchRaces = await axios.get(import.meta.env.VITE_5E_API_URL + 'races')
  allRaces.value = fetchRaces.data.results
}
setup()

watch(characterName, (newValue) => {
  console.log('new value: ' + newValue)
  showUpdateButton.value = true
})

const deleteCharacter = () => {
  store.characterIdToDelete = props.character.id
  store.characterAvatarToDelete = props.character.avatar
  modal.toggleDeleteModal()
}


const handleSubmit = () => {
  console.log('submit' + characterName.value)
}
</script>