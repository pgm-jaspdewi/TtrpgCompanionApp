<template>
  <div class="flex">
    <div class="capitalize w-5/6 border-darkKhaki border-b-2 border-r-2 p-1 pl-3">
      {{ item.item }}
    </div>
    <div class="capitalize w-1/6 border-darkKhaki border-b-2 p-1 text-center">
      <input
        min="0"
        type="number"
        @blur="$emit('update-item', amount, index)"
        v-model="amount"
        class="outline-none w-11/12 h-8 text-center border-2 border-darkKhaki rounded-lg focus:border-maroon focus:ring-1 focus:ring-maroon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { equipment } from '@/interfaces'
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object as () => equipment,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const amount = ref(props.item.amount)
</script>
