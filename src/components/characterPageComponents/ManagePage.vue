<template>
  <div>
    <div>
      <h2 class="text-2xl text-maroon font-bold font-title">Edit character</h2>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces';

defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})
</script>