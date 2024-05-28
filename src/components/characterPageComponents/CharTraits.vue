<template>
  <div>
    <p>{{ traitUrl }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  traitUrl: {
    type: Number,
    required: true
  }
})
</script>
