<template>
  <div class="flex h-2/3 px-2 items-center">
    <p class="text-lg w-5/6 mr-2">Passive Perception</p>
    <div
      class="border-2 border-darkKhaki bg-lightKhaki rounded-lg h-full flex justify-center items-center"
    >
      <p class="text-xl px-2">{{ passivePerception }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  wisdom: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
})

// Calculate the proficiency bonus according to the dnd rules
const proficiencyBonus = computed(() => {
  return Math.floor((props.level - 1) / 4) + 2
})

// calculate the stat-modifier bonus according to the dnd rules
const statModifier = computed(() => {
  return Math.floor((props.wisdom - 10) / 2)
})

// Calculate the passive perception according to the dnd rules
const passivePerception = computed(() => {
  return 10 + proficiencyBonus.value + statModifier.value
})

console.log('pp' + passivePerception.value)
</script>
