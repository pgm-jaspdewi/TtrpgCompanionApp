<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-sm pl-2">
      {{ label }}
    </label>

    <select
      class="outline-none p-2 px-3 rounded-full border-2 border-darkKhaki bg-lightKaki focus:border-maroon focus:ring-1 focus:ring-maroon"
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
  }
})
</script>
