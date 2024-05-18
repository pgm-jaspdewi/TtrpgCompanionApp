<template>
  <div class="flex flex-col items-center w-20 min-w-20 z-10">
    <p class="mb-1 text-xs">{{ text }}</p>
    <div
      class="border-3 rounded-full h-5 w-5 border-maroon"
      v-bind:class="{ 'bg-maroon': nr === step, 'bg-lightKhaki': nr !== step }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  nr: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    required: true
  }
})
</script>
