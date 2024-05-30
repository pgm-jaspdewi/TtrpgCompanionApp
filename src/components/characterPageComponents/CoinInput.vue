<template>
  <div
    class="border-2 border-maroon rounded-xl p-2 pl-7 m-2 mr-2 relative flex justif items-center bg-paleGold w-1/6"
  >
    <p class="absolute border-2 border-maroon rounded-full bg-paleGold uppercase px-2 right-coins">
      {{ coinType }}
    </p>
    <input
      min="0"
      type="number"
      @blur="$emit('update-coin', amount, index)"
      v-model="amount"
      class="outline-none w-11/12 h-8 text-center border-2 border-darkKhaki rounded-lg focus:border-maroon focus:ring-1 focus:ring-maroon"
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
