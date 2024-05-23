<!-- Borders used on landing-, login-, and wizard-views -->
<template>
  <div
    class="border-2 border-silverChalice w-outerContainer max-w-maxWidth min-h-statsOuterContainer h-full my-outerContainer m-auto rounded-lg"
  >
    <div
      :class="{ relative: relative }"
      class="border-2 border-silverChalice w-innerContainer max-w-innerMaxWidth min-h-statsInnerContainer h-full m-innerContainer rounded-lg p-4"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  relative: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
