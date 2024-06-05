<template>
  <div class="flex flex-col items-center w-[45px] min-w-10 tablet:w-20 tablet:min-w-20 z-10">
    <p class="mb-1 text-xs hidden tablet:block">{{ text }}</p>
    <div
      class="border-3 rounded-full h-5 w-5 border-maroon"
      v-bind:class=" nr === step ?  'bg-maroon' :'bg-lightKhaki'"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  nr: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    required: true
  }
})
</script>
