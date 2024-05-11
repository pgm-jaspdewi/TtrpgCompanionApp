<template>
  <img
    v-if="src"
    :src="src"
    alt="Avatar"
    class="border-2 border-darkKhaki rounded-lg bg-lightKhaki object-contain"
    :style="{ height: size + 'em', width: size + 'em' }"
  />
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 10
  }
})
</script>
