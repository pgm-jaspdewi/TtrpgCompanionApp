<script setup lang="ts">
import type { character as CharacterType } from '@/interfaces'
import { FaTrash } from 'vue3-icons/fa6'

defineProps<{
  character: CharacterType
}>()

const navigateToCharacter = () => {
  console.log('navigate to character')
  // navigation logic goes here
}

const deleteCharacter = () => {
  console.log('delete character')
  // delete logic goes here once backend is set up properly
}
</script>

<template>
  <div class="flex">
    <div
      @click="navigateToCharacter"
      class="bg-paleGold border-1 border-darkKhaki rounded-lg w-characterCard h-characterCard flex align-top justify-between p-characterCard my-2 group hover:border-maroon hover:bg-lightKaki cursor-pointer"
    >
      <div class="flex">
        <div
          class="border-1 border-darkKhaki group-hover:border-maroon w-image h-image overflow-hidden bg-lightKaki rounded-lg mr-4"
        >
          <img :src="character.image" alt="character image" class="group-hover:grayscale" />
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
      class="border-1 my-2 ml-4 rounded-lg px-3 border-maroon bg-maroon hover:bg-lightKaki group"
    >
      <div class="w-9 h-9 bg-lightKaki rounded-full flex justify-center items-center">
        <FaTrash class="fill-maroon group-hover:fill-maroon w-5 h-5" />
      </div>
    </button>
  </div>
</template>
