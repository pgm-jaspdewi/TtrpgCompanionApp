<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 class="text-4xl font-bold font-title text-maroon">{{ $props.title }}</h1>
  <hr class="mb-6 border-2 border-maroon" />
</template>
