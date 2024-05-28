<template>
  <!-- hitpoint information -->
  <div
    class="bg-paleGold border-2 border-maroon rounded-lg w-auto m-2 flex items-center justify-center"
  >
    <!-- hitpoints display -->
    <div class="w-1/2 flex flex-col items-center">
      <h3 class="text-xl text-maroon font-bold">Hit points</h3>
      <div class="text-3xl flex justify-between items-center w-1/2">
        <p
          :class="{
            'text-redishBrown font-bold': character.currentHitPoints <= character.maxHitPoints / 4,
            'text-britishRacingGreen': character.currentHitPoints > character.maxHitPoints / 4
          }"
        >
          {{ character.currentHitPoints }}
        </p>
        <p class="text-5xl">/</p>
        <p>{{ character.maxHitPoints }}</p>
      </div>
      <div class="flex justify-between items-center w-2/3">
        <p class="ml-2">Current</p>
        <p class="mr-5">Max</p>
      </div>
    </div>
    <!-- hitpoints buttons -->
    <form @submit.prevent class="w-1/2 flex flex-col items-center">
      <button
        :disabled="formData.hitPoints === 0"
        @click="submitHeal"
        :class="{
          'text-britishRacingGreen border-britishRacingGreen hover:bg-britishRacingGreen hover:text-paleGold':
            formData.hitPoints > 0,
          'text-britishRacingGreen/50 border-britishRacingGreen/50': formData.hitPoints === 0
        }"
        class="border-2 rounded-lg px-2 m-1 w-1/2"
      >
        Heal
      </button>
      <input
        type="number"
        min="0"
        v-model="formData.hitPoints"
        class="border-2 border-darkKhaki rounded-lg px-2 w-1/2 outline-none focus:ring-1 focus:ring-darkKhaki"
      />
      <button
        :disabled="formData.hitPoints === 0"
        @click="submitDamage"
        :class="{
          'text-redishBrown border-redishBrown hover:bg-redishBrown hover:text-paleGold':
            formData.hitPoints > 0,
          'text-redishBrown/50 border-redishBrown/50': formData.hitPoints === 0
        }"
        class="border-2 rounded-lg px-2 m-1 w-1/2"
      >
        Damage
      </button>
    </form>
  </div>
  <!-- hit dice information -->
  <div
    class="bg-paleGold border-2 border-maroon rounded-lg m-2 mx-auto flex items-center justify-center px-3"
  >
    <p class="m-1 text-maroon font-bold">Hit Dice</p>
    <p class="m-1 border-2 border-darkKhaki bg-lightKhaki rounded-lg px-2 flex items-center">
      1d{{ hitDie }} / level
    </p>
  </div>
  <!-- AC, initiative & speed -->
  <div class="bg-paleGold border-2 w-auto m-2 h-20"></div>
  <!-- death saves -->
  <div class="bg-paleGold border-2 w-auto m-2 h-20"></div>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces'
import { reactive } from 'vue'
import { HitPoints } from '.'

defineProps({
  hitDie: {
    type: Number,
    required: true
  },
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

const formData = reactive({
  hitPoints: 0
})

const submitHeal = () => {
  console.log(`heal ${formData.hitPoints} hp`)
}

const submitDamage = () => {
  console.log(`take ${formData.hitPoints} hp damage`)
}
</script>
