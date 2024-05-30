<template>
  <div class="flex">
    <div class="capitalize w-5/6 border-darkKhaki border-b-2 border-r-2 p-1 pl-3">
      {{ item.item }}
    </div>
    <div class="capitalize w-1/6 border-darkKhaki border-b-2 p-1 text-center">
      {{ item.amount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { equipment } from '@/interfaces'

defineProps({
  item: {
    type: Object as () => equipment,
    required: true
  }
})
</script>
