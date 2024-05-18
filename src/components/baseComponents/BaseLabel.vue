<!-- Label for use with forms -->
<template>
  <p :class="{ 'pb-1': pb, 'pl-2': pl === 'small', 'pl-4': pl === 'large' }" class="text-sm">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineProps({
  pb: {
    type: Boolean,
    default: false
  },
  pl: {
    type: String,
    validator: (value: string) => ['none', 'small', 'large'].includes(value),
    default: 'large'
  }
})
</script>
