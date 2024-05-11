<template>
  <!-- Attributes do not need to be passed as props,they will be inherited from parent components as fallthrough attributes -->
  <!-- https://vuejs.org/guide/components/attrs -->
  <button
    :class="{
      'flex-row-reverse': mirror,
      'text-maroon hover:bg-none hover:border-darkKhaki hover:text-darkKhaki': secondary,
      'bg-maroon text-lightKhaki hover:bg-lightKhaki hover:text-maroon ': !secondary
    }"
    class="border-2 border-maroon text-base py-2 px-3 rounded-3xl flex items-center justify-between group"
  >
    {{ $props.btnContent }}
    <div
      :class="{
        'mr-4': mirror,
        'ml-4': !mirror,
        'bg-maroon group-hover:bg-darkKhaki': secondary,
        'bg-lightKhaki group-hover:bg-maroon': !secondary
      }"
      class="rounded-full w-6 h-6 flex justify-center items-center"
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
  },
  secondary: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
