<template>
  <div class="flex flex-col">
    <BaseLabel v-if="label" pl="large">
      {{ label }}
    </BaseLabel>

    <select
      :class="smallFormMode ? 'text-sm p-1 m-2 my-1 rounded-lg' : 'text-base p-2 rounded-full'"
      class="outline-none px-3 border-2 border-darkKhaki bg-lightKhaki focus:border-maroon focus:ring-1 focus:ring-maroon"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled :selected="'' === modelValue">Select an option</option>
      <option
        v-for="item in options"
        :key="item.index"
        :value="item.index"
        :selected="item.index === modelValue"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import BaseLabel from '@/components/baseComponents/BaseLabel.vue'

defineProps({
  // modelValue prop is required, it is the v-model binding
  modelValue: {
    type: String,
    default: '',
    required: true
  },
  // label prop is optional, if not provided, it will not render the label
  label: {
    type: String,
    default: null
  },
  // options prop is required, it is the options for the select element
  options: {
    type: Array as () => Array<{ index: string; name: string }>,
    required: true
  },
  smallFormMode: {
    type: Boolean,
    default: false
  }
})
</script>
