<template>
  <div class="flex h-2/3 px-2 items-center">
    <p class="text-lg w-5/6 mr-2">Proficiency Bonus</p>
    <div class="border-2 border-darkKhaki bg-lightKhaki rounded-lg h-full flex items-center">
      <p class="text-xl pl-2">+</p>
      <p class="text-xl pr-2">{{ bonus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    required: true
  }
})

// Calculate the proficiency bonus according to the dnd rules
const bonus = computed(() => {
  return Math.floor((props.level - 1) / 4) + 2
})
</script>
