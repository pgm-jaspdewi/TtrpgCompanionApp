<script setup lang="ts">
defineProps<{
  btnContent: string
}>()
</script>

<template>
  <!-- Attributes do not need to be passed as props,they will be inherited from parent components as fallthrough attributes -->
  <!-- https://vuejs.org/guide/components/attrs -->
  <button
    class="bg-maroon hover:bg-lightKaki text-lightKaki hover:text-maroon border-2 border-maroon text-xl ml-10 py-3 px-4 rounded-3xl flex items-center justify-between group"
  >
    {{ $props.btnContent }}
    <div
      class="bg-lightKaki group-hover:bg-maroon rounded-full w-8 h-8 flex justify-center items-center ml-4"
    >
      <slot></slot>
    </div>
  </button>
</template>
