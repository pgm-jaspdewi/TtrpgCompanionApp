<template>
  <!-- Attributes do not need to be passed as props,they will be inherited from parent components as fallthrough attributes -->
  <!-- https://vuejs.org/guide/components/attrs -->
  <div class="flex justify-center">
    <button
      class="bg-maroon hover:bg-lightKhaki text-lightKhaki hover:text-maroon border-2 border-maroon text-xl text-bold py-3 px-5 rounded-xl flex items-center justify-between group shadow-lg"
    >
      {{ btnContent }}
      <div
        class="bg-lightKhaki group-hover:bg-maroon rounded-full w-8 h-8 flex justify-center items-center ml-4"
      >
        <slot></slot>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  btnContent: {
    type: String,
    required: true
  }
})
</script>
