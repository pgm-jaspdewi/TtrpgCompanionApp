<!-- Borders used on landing-, login-, and wizard-views -->
<template>
  <div
    class="border-2 border-silverChalice w-outerContainer min-h-outerContainer  my-outerContainer m-auto rounded-lg"
  >
    <div
      :class="{ relative: relative }"
      class="border-2 border-silverChalice w-innerContainer min-h-innerContainer m-innerContainer rounded-lg p-8 pt-12 tablet:pt-8 flex justify-center items-center"
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
