<template>
  <h1 :class="smallerTitle ? 'text-3xl' : 'text-4xl'" class="font-bold font-title text-maroon">
    {{ title }}
  </h1>
  <hr class="mb-6 border-2 border-maroon" />
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  smallerTitle: {
    type: Boolean,
    default: false
  }
})
</script>
