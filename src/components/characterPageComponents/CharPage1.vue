<template>
  <div class="max-w-maxWidth mx-auto">
    <!-- top row -->
    <div class="mb-4 flex flex-col laptopLg:flex-row justify-between">
      <!-- avatar + basic info -->
      <div
        class="m-2 border-2 border-darkKhaki rounded-lg w-10/12 laptopSm:w-7/12 laptopLg:w-4/12 flex items-start justify-between shadow-lg"
      >
        <div class="flex">
          <BaseImage :src="src" :size="8" class="m-2" />
          <div class="m-2 flex flex-col justify-between h-32">
            <p class="text-3xl laptopLg:text-2xl font-bold text-maroon">{{ character.name }}</p>
            <div class="flex justify-between">
              <p class="text-2xl laptopLg:text-xl capitalize mr-4">{{ character.race }}</p>
              <p class="text-2xl laptopLg:text-xl capitalize">{{ character.class }}</p>
            </div>
            <p class="text-2xl laptopLg:text-xl capitalize">level {{ character.level }}</p>
          </div>
        </div>
        <BaseButtonBig class="m-2 laptopLg:hidden" btnContent="Lvl up">
          <FaArrowUp class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButtonBig>

        <BaseButton class="m-2 hidden laptopLg:flex" btnContent="Lvl up">
          <FaArrowUp class="fill-maroon group-hover:fill-lightKhaki w-4 h-4" />
        </BaseButton>
      </div>

      <!-- Stats -->
      <div
        class="m-2 rounded-lg laptopLg:w-7/12 flex justify-center items-start h-36 shadow-lg bg-maroon/50"
      >
        <CharStat :title="'str'" :stat="parseInt(character.stats.str)" />
        <CharStat :title="'dex'" :stat="parseInt(character.stats.dex)" />
        <CharStat :title="'con'" :stat="parseInt(character.stats.con)" />
        <CharStat :title="'int'" :stat="parseInt(character.stats.int)" />
        <CharStat :title="'wis'" :stat="parseInt(character.stats.wis)" />
        <CharStat :title="'cha'" :stat="parseInt(character.stats.cha)" />
      </div>
    </div>
    <!-- columns -->
    <div class="flex flex-col laptopSm:flex-row justify-between w-full">
      <!-- first two colums -->
      <div class="flex w-full laptopSm:w-8/12 mb-3">
        <!-- first column -->
        <div class="w-6/12 laptopSm:w-5/12 flex flex-col">
          <div
            class="mx-2 mt-1 border-2 border-darkKhaki rounded-lg h-32 flex justify-center items-center"
          >
            Saving throws
          </div>
          <div
            class="mx-2 mt-4 mb-1 border-2 border-darkKhaki rounded-lg grow flex justify-center items-center"
          >
            Skill throws
          </div>
        </div>

        <!-- second column -->
        <div class="w-6/12 laptopSm:w-7/12">
          <div class="w-full flex flex-col laptopSm:flex-row">
            <div
              class="mx-2 my-1 h-16 border-2 border-darkKhaki rounded-lg laptopSm:w-1/2 flex justify-center items-center shadow-lg"
            >
              <ProficiencyBonus :level="character.level" />
            </div>
            <div
              class="mx-2 my-1 h-16 border-2 border-darkKhaki rounded-lg laptopSm:w-1/2 flex justify-center items-center shadow-lg"
            >
              <PassivePerception :level="character.level" :wisdom="parseInt(character.stats.wis)" />
            </div>
          </div>

          <div
            class="mx-2 my-3 border-2 border-darkKhaki rounded-lg h-80 flex justify-center items-center"
          >
            Hit points and stuff
          </div>
          <div
            class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg h-80 flex justify-center items-center"
          >
            Attacks
          </div>
        </div>
      </div>

      <!-- third column -->
      <div class="laptopSm:w-4/12 flex laptopSm:flex-col">
        <div
          class="mx-2 mb-3 border-2 border-darkKhaki rounded-lg h-96 flex justify-center items-center w-1/2 laptopSm:w-auto"
        >
          Features & traits
        </div>
        <div
          class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg h-72 flex justify-center items-center w-1/2 laptopSm:w-auto"
        >
          Proficiencies & languages
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces'
import { supabase } from '@/supabase'
import { BaseImage, BaseButton, BaseButtonBig } from '@/components/baseComponents'
import { ref } from 'vue'
import { FaArrowUp } from 'vue3-icons/fa6'
import { CharStat, ProficiencyBonus, PassivePerception } from '@/components/characterPageComponents'

const src = ref('')

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

const downloadImage = async () => {
  // Download the image from the storage-bucket to show in the UI
  try {
    const { data, error } = await supabase.storage.from('avatars').download(props.character.avatar)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', (error as Error).message)
  }
}
downloadImage()

console.log(props.character)
</script>
