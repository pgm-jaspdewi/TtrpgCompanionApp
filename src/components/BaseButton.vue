<template>
  <!-- Attributes do not need to be passed as props,they will be inherited from parent components as fallthrough attributes -->
  <!-- https://vuejs.org/guide/components/attrs -->
  <button
    :class="{ 'flex-row-reverse': mirror }"
    class="bg-maroon hover:bg-lightKaki text-lightKaki hover:text-maroon border-2 border-maroon text-base py-2 px-3 rounded-3xl flex items-center justify-between group"
  >
    {{ $props.btnContent }}
    <div
      :class="{ 'mr-4': mirror, 'ml-4': !mirror }"
      class="bg-lightKaki group-hover:bg-maroon rounded-full w-6 h-6 flex justify-center items-center"
    >
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  btnContent: {
    type: String,
    required: true
  },
  mirror: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
