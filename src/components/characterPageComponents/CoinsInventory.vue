<template>
  <div>
    <p>coins will go here</p>
  </div>
</template>

<script setup lang="ts">
import type { characterWealth } from '@/interfaces'

defineProps({
  coins: {
    type: Object as () => characterWealth,
    required: true
  }
})
</script>
