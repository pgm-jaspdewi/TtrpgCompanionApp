<template>
  <div class="flex flex-col">
    <BaseLabel v-if="label" pl="large">
      {{ label }}
    </BaseLabel>
    <input
      class="outline-none p-2 px-3 rounded-full border-2 border-darkKhaki bg-lightKhaki focus:border-maroon focus:ring-1 focus:ring-maroon"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      v-bind:type="type"
      v-bind:id="id"
    />
  </div>
</template>

<script setup lang="ts">
import BaseLabel from './BaseLabel.vue'

defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: String,
    default: ''
  },
  // id prop is required, it is the id of the input element
  id: {
    type: String,
    default: '',
    required: true
  },
  // label prop is optional, if not provided, it will not render the label
  label: {
    type: [String, Boolean],
    default: false
  },
  // type prop is optional, if not provided, it will default to 'text'
  type: {
    type: String,
    default: 'text'
  }
})
</script>
