<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="text-maroon">{{ msg }}</h1>

    <!-- slot allows HTML to be passed to a child component -->
    <slot></slot>
  </div>
</template>
