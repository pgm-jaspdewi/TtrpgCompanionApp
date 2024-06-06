<template>
  <div
    class="border-2 border-maroon rounded-xl p-2 pl-7 m-2 mx-4 relative flex justif items-center bg-paleGold w-1/3 tablet:w-1/6"
  >
    <p class="absolute border-2 border-maroon rounded-full bg-paleGold uppercase px-2 right-[75%] tablet:right-[80%] tabletLg:right-[85%] laptopLg:right-[75%]">
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

</script>
