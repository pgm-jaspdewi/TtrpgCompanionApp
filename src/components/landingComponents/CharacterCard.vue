<template>
  <div class="flex items-start">
    <div
      @click="navigateToCharacter"
      class="bg-paleGold border-1 border-darkKhaki rounded-lg w-characterCard h-characterCard flex align-top justify-between p-characterCard my-2 group hover:border-maroon hover:bg-lightKhaki cursor-pointer"
    >
      <div class="flex">
        <div
          class="border-1 border-darkKhaki group-hover:border-maroon w-image h-image overflow-hidden bg-lightKhaki rounded-lg mr-4"
        >
          <img :src="src" alt="character image" class="group-hover:grayscale" />
        </div>

        <div class="flex flex-col justify-between">
          <p class="font-title font-bold text-maroon text-xl">{{ character.name }}</p>
          <p><span class="text-maroon">Race: </span>{{ character.race }}</p>
          <div class="flex">
            <p class="mr-2"><span class="text-maroon">Lvl: </span>{{ character.level }}</p>
            <p><span class="text-maroon">Class: </span>{{ character.class }}</p>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="deleteCharacter"
      class="w-10 h-10 border-1 my-2 ml-2 rounded-lg group flex justify-center items-center border-darkKhaki hover:bg-maroon"
    >
      <FaTrash class="fill-darkKhaki group-hover:fill-lightKhaki w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails as CharacterType } from '@/interfaces'
import { FaTrash } from 'vue3-icons/fa6'
import { supabase } from '@/supabase'
import { ref, toRefs } from 'vue'
import { useModalStore } from '@/stores/modal-store'

const store = useModalStore()

const props = defineProps<{
  character: CharacterType
}>()

const { character } = toRefs(props)
const src = ref('')

const downloadImage = async () => {
  // Download the image from the storage-bucket to show in the UI
  try {
    const { data, error } = await supabase.storage.from('avatars').download(character.value.avatar)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', (error as Error).message)
  }
}
if (character.value.avatar !== '') downloadImage()

const navigateToCharacter = () => {
  console.log('navigate to character' + character.value.id)
  // navigation logic goes here
}

const deleteCharacter = () => {
  store.characterIdToDelete = character.value.id
  store.toggleDeleteModal()
}
</script>
