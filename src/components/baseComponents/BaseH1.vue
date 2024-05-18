<template>
  <h1 class="text-4xl font-bold font-title text-maroon">{{ title }}</h1>
  <hr class="mb-6 border-2 border-maroon" />
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
