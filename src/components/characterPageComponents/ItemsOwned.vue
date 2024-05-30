<template>
  <div class="w-11/12 p-2 pb-4">
    <div class="flex">
      <h3
        v-if="type === 'weapons'"
        class="capitalize font-bold text-maroon w-5/6 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        weapon
      </h3>
      <h3
        v-if="type === 'items'"
        class="capitalize font-bold text-maroon w-5/6 mt-2 border-darkKhaki border-b-2 border-r-2 p-2"
      >
        Item
      </h3>

      <h3 class="capitalize font-bold text-maroon w-1/6 mt-2 border-darkKhaki border-b-2 p-2">
        quantity
      </h3>
    </div>
    <ItemDisplay v-for="(item, index) of items" :key="index" :item="item" />
  </div>
</template>

<script setup lang="ts">
import type { equipment } from '@/interfaces'
import { ItemDisplay } from '@/components/characterPageComponents'

defineProps({
  items: {
    type: Array as () => equipment[],
    required: true
  },
  type: {
    type: String,
    validator: (value: string) => ['weapons', 'items'].includes(value),
    required: true
  }
})
</script>
