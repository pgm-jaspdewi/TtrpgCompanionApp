<template>
  <div
    class="border-2 border-maroon m-2 mb-5 h-28 w-1/3 tablet:w-1/6 rounded-lg flex flex-col items-center bg-paleGold shadow-lg relative"
  >
    <p class="mt-2 mb-1 uppercase text-maroon font-bold">{{ title }}</p>
    <div
      class="border-2 border-darkKhaki mb-2 h-1/2 rounded-lg w-10/12 flex justify-center items-center bg-lightKhaki"
    >
      <p v-if="bonus >= 0" class="text-2xl text-black/85">+ {{ bonus }}</p>
      <p v-if="bonus < 0" class="text-2xl text-black/85">{{ bonus }}</p>
    </div>
    <p
      class="absolute w-1/2 border-2 border-maroon rounded-full top-stats bg-paleGold flex justify-center shadow-lg"
    >
      {{ stat }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  stat: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
// calculate the stat-modifier bonus according to the dnd rules
const bonus = computed(() => {
  return Math.floor((props.stat - 10) / 2)
})
</script>
