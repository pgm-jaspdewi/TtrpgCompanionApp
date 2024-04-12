<!-- styled form-component, gets attributes from parent-component, making it fully reusable without having to style it every time -->

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <label class="text-sm pl-2"> {{ text }}</label>
</template>
