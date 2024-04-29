<template>
  <div>
    <h2 class="text-3xl font-bold font-title text-maroon">Roll Stats</h2>
    <hr class="mb-2 border-2 border-maroon" />

    <div class="m-4">
      <p class="font-bold">1. Use the button to generate your stats.</p>
      <p class="text-sm ml-3">
        The tool will use the calculation from the players handbook to generate your stats. (roll
        4d6, drop the lowest)
      </p>
      <div class="flex justify-center my-2">
        <BaseButton btnContent="Generate values" @click="generateStats()">
          <FaDice class="fill-maroon group-hover:fill-lightKaki w-4 h-4" />
        </BaseButton>
      </div>
    </div>

    <div class="m-4">
      <p class="font-bold">2. Wait for the results.</p>
      <p class="text-sm ml-3">Results will be displayed here.</p>
      <div class="flex justify-center">
        <div v-if="generatedNumbers.length === 0" class="p-2 border-2 border-maroon rounded-lg">
          <p class="text-maroon font-bold">No dice rolled yet</p>
        </div>

        <div
          v-if="generatedNumbers.length !== 0"
          class="p-2 border-2 border-maroon rounded-lg flex mt-2"
        >
          <p
            v-for="(number, index) in generatedNumbers"
            :key="index"
            class="text-2xl font-bold mx-2"
          >
            {{ number.value }}
          </p>
        </div>
      </div>
    </div>

    <div class="m-4">
      <p class="font-bold">3. Assign the results to your stat of choice & confirm.</p>

      <div class="flex justify-center">
        <BaseSelectSmall label="Str" />
        <BaseSelectSmall label="Dex" />
        <BaseSelectSmall label="Con" />
        <BaseSelectSmall label="Int" />
        <BaseSelectSmall label="Wis" />
        <BaseSelectSmall label="Cha" />
      </div>
    </div>

    <div class="flex justify-between">
      <BaseButton btnContent="Back" @click="store.toggleStatModal">
        <FaXmark class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
      </BaseButton>
      <BaseButton btnContent="Confirm" @click="store.toggleStatModal">
        <FaCheck class="fill-maroon group-hover:fill-lightKaki w-5 h-5" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { FaXmark, FaCheck, FaDice } from 'vue3-icons/fa6'
import { useStatModalStore } from '@/stores/modal-stores'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { reactive } from 'vue'
import BaseSelectSmall from './BaseSelectSmall.vue'

const roll = new DiceRoll('4d6dl1')

const generatedNumbers: { value: number; disabled: boolean }[] = reactive([])

const generateStats = () => {
  if (generatedNumbers.length > 0) {
    generatedNumbers.splice(0, generatedNumbers.length)
  }
  for (let i = 0; i < 6; i++) {
    roll.roll()
    generatedNumbers.push({ value: roll.total, disabled: false })
    store.modalOptions = generatedNumbers
    // console.log(generatedNumbers)
    console.log(store.modalOptions)
  }
}

const store = useStatModalStore()
</script>
