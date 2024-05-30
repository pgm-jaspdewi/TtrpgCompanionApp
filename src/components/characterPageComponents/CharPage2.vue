<template>
  <!-- columns -->
  <div class="flex flex-col laptopSm:flex-row justify-between w-full">
    <!-- column 1 -->
    <div class="laptopSm:w-6/12 laptopSm:mr-10">
      <div
        class="m-2 mt-1 mb-10 border-2 border-darkKhaki rounded-lg h-28 flex justify-center items-center"
      >
        Coins
      </div>
      <div
        class="m-2 mt-1 mb-10 border-2 border-darkKhaki rounded-lg h-56 flex justify-center items-center"
      >
        Equipment
      </div>
    </div>
    <!-- column 2 -->
    <div class="laptopSm:w-6/12 laptopSm:ml-10">
      <div
        class="m-2 mt-1 border-2 border-darkKhaki rounded-lg h-96 flex justify-center items-center"
      >
        Backpack
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { characterDetails } from '@/interfaces'

const props = defineProps({
  character: {
    type: Object as () => characterDetails,
    required: true
  }
})

console.log('character:', props.character)
</script>
