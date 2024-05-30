<template>
  <div>
    <p>{{ coinType }}</p>
    <input
      min="0"
      type="number"
      @blur="$emit('update-coin', amount, index)"
      v-model="amount"
      class="w-16 h-8 text-center border-2 border-darkKhaki rounded-lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  characterId: {
    type: Number,
    required: true
  },
  coinType: {
    type: String,
    required: true
  },
  coinAmount: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
const amount = ref(props.coinAmount)

// console.log(props.index)
</script>
