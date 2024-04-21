<!-- Borders used on landing-, login-, and wizard-views -->
<template>
  <div
    class="border-2 border-silverChalice w-outerContainer min-h-outerContainer h-full my-outerContainer m-auto rounded-lg"
  >
    <div
      class="border-2 border-silverChalice w-innerContainer min-h-innerContainer m-innerContainer rounded-lg p-8 flex justify-center items-center {{ relative ? 'relative' : '' }}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  relative?: boolean
}>()
</script>
